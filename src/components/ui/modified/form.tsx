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
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// ----------------------------------------------------------------------------
// 1) A Context + <Form> wrapper that accepts a Zod schema (including .refine())
// ----------------------------------------------------------------------------

const FormSchemaContext = React.createContext<z.ZodTypeAny | undefined>(
  undefined,
);

/**
 * Access the Zod schema from anywhere.
 */
export function useFormSchema() {
  return React.useContext(FormSchemaContext);
}

/**
 * Custom <Form> that:
 * - wraps FormProvider from RHF
 * - passes a (possibly refined) Zod schema via context
 */
type ExtendedFormProps = React.ComponentPropsWithoutRef<typeof FormProvider> & {
  schema?: z.ZodTypeAny;
};

function Form({ schema, children, ...formProps }: ExtendedFormProps) {
  return (
    <FormSchemaContext.Provider value={schema}>
      <FormProvider {...formProps}>{children}</FormProvider>
    </FormSchemaContext.Provider>
  );
}

// ----------------------------------------------------------------------------
// 2) The "unwrap" logic to remove ZodEffects layers
// ----------------------------------------------------------------------------

function unwrapEffects(schema: z.ZodTypeAny): z.ZodTypeAny {
  while (schema instanceof z.ZodEffects) {
    schema = schema._def.schema;
  }
  return schema;
}

// ----------------------------------------------------------------------------
// 3) <FormField> that derives isRequired from the (unwrapped) schema
// ----------------------------------------------------------------------------

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
    // Remove .refine(), .transform(), etc., so we (hopefully) get a ZodObject.
    const unwrapped = unwrapEffects(schema);
    if (unwrapped instanceof z.ZodObject) {
      // If it's truly an object, we can look up the shape by key
      const fieldSchema = unwrapped.shape?.[name] as z.ZodTypeAny;
      if (fieldSchema) {
        // A field is required if it's not optional & not nullable
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

// ----------------------------------------------------------------------------
// 4) `useFormField` to gather info for each field
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// 5) shadcn-style <FormItem>, <FormLabel>, etc.
// ----------------------------------------------------------------------------

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
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
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

// ----------------------------------------------------------------------------
// 6) Export everything
// ----------------------------------------------------------------------------

export {
  // The main <Form> that includes the schema context
  Form,
  // The field that derives `isRequired` from the (possibly refined) Zod schema
  FormField,
  // The rest are standard shadcn form components
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
