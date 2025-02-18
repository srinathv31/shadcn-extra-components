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

// 1) Create a context for storing the Zod schema.
const FormSchemaContext = React.createContext<z.ZodObject<any> | undefined>(
  undefined,
);

// Helper to read it.
function useFormSchema() {
  return React.useContext(FormSchemaContext);
}

// 2) Wrap FormProvider so we can pass in our schema.
type ExtendedFormProps = Omit<
  React.ComponentPropsWithoutRef<typeof FormProvider>,
  "children"
> & {
  children: React.ReactNode;
  schema?: z.ZodObject<any>;
};

/**
 * Custom <Form> component that:
 * - Provides the Zod schema via context
 * - Internally uses <FormProvider> from react-hook-form
 */
function Form({ schema, children, ...props }: ExtendedFormProps) {
  return (
    <FormSchemaContext.Provider value={schema}>
      <FormProvider {...props}>{children}</FormProvider>
    </FormSchemaContext.Provider>
  );
}

// 3) Extend FormField to derive whether the field is required
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  isRequired: boolean;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

type CustomFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName> & {
  name: TName;
};

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, ...props }: CustomFormFieldProps<TFieldValues, TName>) {
  const schema = useFormSchema();

  // default = not required
  let isRequired = false;
  if (schema?.shape?.[name]) {
    const fieldSchema = schema.shape[name] as z.ZodTypeAny;
    // Check optional & nullable
    isRequired = !fieldSchema.isOptional() && !fieldSchema.isNullable();
  }

  return (
    <FormFieldContext.Provider value={{ name, isRequired }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
}

// 4) Expose `isRequired` in useFormField (used by FormLabel, etc.)
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
    ...fieldState,
  };
}

// 5) The rest is the standard "shadcn" structure
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
  // Grab `isRequired` from useFormField
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

// 6) Export everything
export {
  Form, // Our new custom Form with schema support
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField, // optional if you need direct access
};
