"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCarSchema, CreateCarSchema } from "@/lib/table/cars/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { carMakes, carModelMap } from "@/data/cars";

export default function AddCardDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();

  const form = useForm<CreateCarSchema>({
    resolver: zodResolver(createCarSchema),
  });

  function onSubmit(input: CreateCarSchema) {
    startCreateTransition(async () => {
      // submit the form
      console.log("submitting form", input);

      form.reset();
      setIsOpen(false);
      toast.success(
        `${carMakes[+input.make - 1].name} ${input.model} added successfully!`,
      );
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Add Car
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Add Car</DialogTitle>
          <DialogDescription>Add a new car to the list.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <Select
                    onValueChange={(make) => {
                      console.log(carModelMap[form.getValues().make]);
                      form.setValue("model", carModelMap[make][0].name);
                      return field.onChange(make);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {carMakes.map((make) => (
                          <SelectItem
                            key={make.id}
                            value={make.id}
                            className="capitalize"
                          >
                            {make.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={
                      !form.getValues().make ||
                      carModelMap[form.getValues().make].length < 1
                    }
                    defaultValue={
                      !carModelMap[form.getValues().make]
                        ? undefined
                        : String(carModelMap[form.getValues().make][0].id)
                    }
                    value={
                      field.value
                        ? String(field.value)
                        : String(
                            carModelMap[form.getValues().make]?.[0]?.id || "",
                          )
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue
                          placeholder="Select Model"
                          value={
                            field.value
                              ? String(field.value)
                              : String(
                                  carModelMap[form.getValues().make]?.[0]?.id,
                                )
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {carModelMap[form.getValues().make]?.map((model) => (
                          <SelectItem
                            key={model.id}
                            value={String(model.id)}
                            className="capitalize"
                          >
                            {model.year} - {model.make} - {model.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isCreatePending}>
                {isCreatePending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
