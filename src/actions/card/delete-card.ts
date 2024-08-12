'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_deleteCard = async (cardId: string, boardId: string) => {
  try {
    const deletedCard = await db.card.delete({ where: { id: cardId } });
    revalidatePath(`/board/${boardId}`);
    return { success: `Card ${deletedCard.title} deleted` };
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
};
