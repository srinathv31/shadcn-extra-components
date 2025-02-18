"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  FormProviderProps,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// --------------------------------------------------------------------------
// 1) Create a context to store the (possibly refined) Zod schema
// --------------------------------------------------------------------------
const FormSchemaContext = React.createContext<z.ZodTypeAny | undefined>(
  undefined,
);

function useFormSchema() {
  return React.useContext(FormSchemaContext);
}

// --------------------------------------------------------------------------
// 2) Make <Form> generic so it matches your specific TFieldValues
//    This ensures no type mismatch when you do {...useForm<...>()}.
// --------------------------------------------------------------------------
type ExtendedFormProps<TFieldValues extends FieldValues> =
  FormProviderProps<TFieldValues> & {
    schema?: z.ZodTypeAny;
  };

/**
 * A custom <Form> component that wraps react-hook-form's <FormProvider>
 * and also provides a Zod schema via context (for "required" checks).
 */
function Form<TFieldValues extends FieldValues>({
  schema,
  children,
  ...formProps
}: ExtendedFormProps<TFieldValues>) {
  return (
    <FormSchemaContext.Provider value={schema}>
      <FormProvider {...formProps}>{children}</FormProvider>
    </FormSchemaContext.Provider>
  );
}

// --------------------------------------------------------------------------
// 3) Logic to unwrap ZodEffects so we can safely access .shape
// --------------------------------------------------------------------------
function unwrapEffects(schema: z.ZodTypeAny): z.ZodTypeAny {
  while (schema instanceof z.ZodEffects) {
    schema = schema._def.schema;
  }
  return schema;
}

// --------------------------------------------------------------------------
// 4) <FormField> that determines isRequired by unwrapping the schema
// --------------------------------------------------------------------------
type FormFieldContextValue<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  isRequired: boolean;
};

const FormFieldContext = React.createContext<FormFieldContextValue<
  any,
  any
> | null>(null);

function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ name, ...props }: ControllerProps<TFieldValues, TName>) {
  const schema = useFormSchema();

  let isRequired = false;
  if (schema) {
    // Unwrap any ZodEffects
    const unwrapped = unwrapEffects(schema);
    // If it's still an object, try to read .shape
    if (unwrapped instanceof z.ZodObject) {
      const fieldSchema = unwrapped.shape[name] as z.ZodTypeAny;
      if (fieldSchema) {
        isRequired = !fieldSchema.isOptional() && !fieldSchema.isNullable();
      }
    }
  }

  return (
    <FormFieldContext.Provider value={{ name, isRequired }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
}

// --------------------------------------------------------------------------
// 5) A helper hook to gather everything about the current field
// --------------------------------------------------------------------------
function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    isRequired: fieldContext.isRequired,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState, // includes error, isDirty, etc.
  };
}

// --------------------------------------------------------------------------
// 6) The standard shadcn style: <FormItem>, <FormLabel>, etc.
// --------------------------------------------------------------------------
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const { error, formItemId, isRequired } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    >
      {children}
      {isRequired && <span className="text-red-500 ml-1">*</span>}
    </Label>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

// --------------------------------------------------------------------------
// 7) Export all
// --------------------------------------------------------------------------
export {
  Form,
  FormField,
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
