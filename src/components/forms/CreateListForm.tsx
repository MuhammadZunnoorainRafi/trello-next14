'use client';

import { ListSchema } from '@/lib/schemas';
import { ListType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import ListWrapper from '../board/ListWrapper';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { action_createList } from '@/actions/list/create-list';
import { toast } from 'sonner';

type Props = {
  boardId: string;
};
function CreateListForm({ boardId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ListType>({
    defaultValues: { title: '' },
    resolver: zodResolver(ListSchema),
  });

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };
  document.addEventListener('keydown', onKeyDown);

  const formSubmit = (formData: ListType) => {
    startTransition(async () => {
      const res = await action_createList(formData, boardId);
      if (res.success) {
        toast.success(res.success);
      }

      if (res.error) {
        toast.error(res.error);
      }
      disableEditing();
    });
    form.reset();
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmit)}
            className="w-full p-3 rounded-md space-y-4 shadow-md bg-slate-950"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      className="text-sm font-medium transition"
                      placeholder="Enter list title..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-start gap-2">
              <Button disabled={isPending} type="submit">
                Add
              </Button>
              <Button
                disabled={isPending}
                onClick={disableEditing}
                size="icon"
                variant="secondary"
              >
                <Cross1Icon className="h-2 w-2" />
              </Button>
            </div>
          </form>
        </Form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <form action="">
        <button
          onClick={enableEditing}
          className="w-full rounded-md bg-black/80 hover:bg-black/50 transition p-3 flex items-center font-medium text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add a List
        </button>
      </form>
    </ListWrapper>
  );
}

export default CreateListForm;
