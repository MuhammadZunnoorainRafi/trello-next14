'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { ListSchema } from '@/lib/schemas';
import { ListType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const action_createList = async (
  formData: ListType,
  boardId: string
) => {
  const user = await getUserServer();
  if (!user || !user.id) {
    return { error: 'User not found' };
  }

  const validations = ListSchema.safeParse(formData);
  if (!validations.success) {
    return { error: 'Invalid fields' };
  }

  const { title } = validations.data;

  const lastList = await db.list.findFirst({
    where: { boardId },
    select: { position: true },
    orderBy: { position: 'desc' },
  });

  const currentPosition = lastList ? lastList.position + 1 : 1;

  try {
    await db.list.create({
      data: { title, boardId, position: currentPosition },
    });
    revalidatePath(`/board/${boardId}`);
    return { success: `List "${title}" added` };
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
};
