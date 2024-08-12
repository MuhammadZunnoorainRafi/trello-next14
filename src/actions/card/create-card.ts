'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { CardSchema, ListSchema } from '@/lib/schemas';
import { CardType, ListType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const action_createCard = async (
  formData: CardType,
  boardId: string,
  listId: string
) => {
  const user = await getUserServer();
  if (!user || !user.id) {
    return { error: 'User not found' };
  }

  const validations = CardSchema.safeParse(formData);
  if (!validations.success) {
    return { error: 'Invalid fields' };
  }

  const { title, description } = validations.data;

  const lastCard = await db.card.findFirst({
    where: { listId },
    select: { position: true },
    orderBy: { position: 'desc' },
  });

  const currentPosition = lastCard ? lastCard.position + 1 : 1;

  try {
    await db.card.create({
      data: { title, description, listId, position: currentPosition },
    });
    revalidatePath(`/board/${boardId}`);
    return { success: `Card "${title}" added` };
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
};
