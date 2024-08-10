'use client';
import { action_createBoard } from '@/actions/board/create-board';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BoardSchema } from '@/lib/schemas';
import { BoardType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
type Props = {
  orgId: string;
};
export function CreateBoardForm({ orgId }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<BoardType>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      name: '',
    },
  });

  const formSubmit = (formData: BoardType) => {
    startTransition(async () => {
      const res = await action_createBoard({ name: formData.name, orgId });
      if (res?.error) {
        toast.error(res.error);
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full" size="icon">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            Make your tasks to be done on time by creating board
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Pedro Duarte"
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="justify-start">
              <DialogClose asChild>
                <Button disabled={isPending} type="submit">
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
