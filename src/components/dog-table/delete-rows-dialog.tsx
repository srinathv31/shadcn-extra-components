"use client";

import * as React from "react";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

interface DeleteTasksDialogProps<TData>
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  rows: Row<TData>["original"][];
  deleteTasks: (ids: string[]) => Promise<{ error?: string }>;
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function DeleteRowsDialog<TData>({
  rows,
  deleteTasks,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteTasksDialogProps<TData>) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  function onDelete() {
    return () => {
      startDeleteTransition(async () => {
        const { error } = await deleteTasks({
          ids: rows.map((row) => row.id),
        });

        if (error) {
          toast.error(error);
          return;
        }

        props.onOpenChange?.(false);
        toast.success("Tasks deleted");
        onSuccess?.();
      });
    };
  }

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({tasks.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{tasks.length}</span>
            {tasks.length === 1 ? " task" : " tasks"} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <ReloadIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
