'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { CardSchema, ListSchema } from '@/lib/schemas';
import { CardType, ListType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const action_updateCard = async (
  formData: CardType,
  boardId: string,
  cardId: string
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

  try {
    await db.card.update({
      where: { id: cardId },
      data: { title, description },
    });
    revalidatePath(`/board/${boardId}`);
    return { success: `Card "${title}" updated` };
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
};
