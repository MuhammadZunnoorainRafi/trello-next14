'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { UpdateCardSchema } from '@/lib/schemas';
import { UpdateCardOrderType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const action_updateCardOrder = async (
  formData: UpdateCardOrderType,
  boardId: string
) => {
  const user = await getUserServer();
  if (!user || !user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const validation = UpdateCardSchema.safeParse(formData);
  if (!validation.success) {
    return { error: 'Invalid fields' };
  }

  const cards = validation.data;

  try {
    const transaction = cards.map((card) =>
      db.card.update({
        where: { id: card.id },
        data: { position: card.position, listId: card.listId },
      })
    );
    await db.$transaction(transaction);
    revalidatePath(`/board/${boardId}`);
    return { success: 'Card reordered' };
  } catch (error) {
    return { error: 'Internal server error' };
  }
};
