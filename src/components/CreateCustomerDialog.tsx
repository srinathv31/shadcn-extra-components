"use client";

import { createCustomerSchema, CreateCustomerSchema } from "@/lib/validation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CreateCustomerForm } from "./CreateCustomerForm";
import { random } from "@/utils/random";

export default function CreateCustomerDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [isCreatePending, startCreateTransition] = useTransition();

  const form = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      promo_code: random(1000, 9999),
    },
  });

  function onSubmit(data: CreateCustomerSchema) {
    startCreateTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(data);

      form.reset();
      setOpen(false);
      toast.success("Customer created");
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <CreateCustomerForm form={form} onSubmit={onSubmit}>
          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isCreatePending}>
              {isCreatePending && (
                <ReloadIcon
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Create
            </Button>
          </DialogFooter>
        </CreateCustomerForm>
      </DialogContent>
    </Dialog>
  );
}
