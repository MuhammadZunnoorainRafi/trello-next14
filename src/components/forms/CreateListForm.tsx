'use client';

import { action_createList } from '@/actions/list/create-list';
import { action_updateList } from '@/actions/list/update-list';
import { ListSchema } from '@/lib/schemas';
import { ListType, ListWithCardsType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cross1Icon, CrossCircledIcon, PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { action_deleteList } from '@/actions/list/delete-list';

type Props = {
  boardId: string;
  data?: ListWithCardsType;
};
function CreateListForm({ boardId, data }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ListType>({
    resolver: zodResolver(ListSchema),
  });

  useEffect(() => {
    if (data?.title) {
      form.reset({ title: data.title });
    } else {
      form.reset({ title: '' });
    }
  }, [data, form]);

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
      const res = data
        ? await action_updateList(formData, boardId, data.id)
        : await action_createList(formData, boardId);
      if (res.success) {
        toast.success(res.success);
      }

      if (res.error) {
        toast.error(res.error);
      }
      disableEditing();
    });
  };

  const handleDelete = () => {
    if (data) {
      startTransition(async () => {
        const res = await action_deleteList(data.id);
        if (res.success) {
          toast.success(res.success);
        }

        if (res.error) {
          toast.error(res.error);
        }
      });
    }
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
                  {!data && <FormLabel>Title</FormLabel>}
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
            <div
              className={`${
                data && 'hidden'
              } flex items-center justify-start gap-2`}
            >
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
      <button
        onClick={enableEditing}
        className="group w-full rounded-md bg-black/80 hover:bg-black/50 transition p-3 flex items-center font-medium text-sm"
      >
        {data ? (
          <p className="flex items-center w-full text-start">
            <span className="flex-1">{data.title}</span>
            <span
              onClick={handleDelete}
              className="flex-0 group-hover:inline-block hidden "
            >
              <CrossCircledIcon className="h-4 w-4 hover:scale-110 hover:text-red-500 duration-200" />
            </span>
          </p>
        ) : (
          <>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add a List
          </>
        )}
      </button>
    </ListWrapper>
  );
}

export default CreateListForm;
