'use client';

import { action_createCard } from '@/actions/card/create-card';
import { action_deleteCard } from '@/actions/card/delete-card';
import { action_updateCard } from '@/actions/card/update-card';
import { CardSchema } from '@/lib/schemas';
import { CardType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@prisma/client';
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

type Props = {
  data?: Card;
  boardId: string;
  listId: string;
};

function CreateCardForm({ data, boardId, listId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CardType>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const formSubmit = (formData: CardType) => {
    startTransition(async () => {
      const res = data
        ? await action_updateCard(formData, boardId, data.id)
        : await action_createCard(formData, boardId, listId);
      if (res.success) {
        toast.success(res.success);
      }

      if (res.error) {
        toast.error(res.error);
      }
      disableEditing();
      form.reset();
    });
  };

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description ? data.description : '',
      });
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

  const handleDelete = () => {
    if (data) {
      startTransition(async () => {
        const res = await action_deleteCard(data.id, boardId);
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      className="text-sm font-medium transition"
                      placeholder="Enter list description..."
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
      <div
        onClick={enableEditing}
        className="group w-full cursor-pointer rounded-md bg-black/40 hover:bg-black/30 transition p-3 flex items-center font-medium text-sm"
      >
        {data ? (
          <div className="flex items-center w-full text-start">
            <div className="flex-1">
              <h1 className="font-semibold text-slate-50">{data.title}</h1>
              <p className="text-sm text-slate-200">{data.description}</p>
            </div>
            <span
              onClick={handleDelete}
              className="flex-0 group-hover:inline-block hidden "
            >
              <CrossCircledIcon className="h-4 w-4 hover:scale-110 hover:text-red-500 duration-200" />
            </span>
          </div>
        ) : (
          <>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add a Card
          </>
        )}
      </div>
    </ListWrapper>
  );
}

export default CreateCardForm;
