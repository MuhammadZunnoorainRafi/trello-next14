'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { UpdateListSchema } from '@/lib/schemas';
import { UpdateListOrderType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const action_updateListOrder = async (
  formData: UpdateListOrderType,
  boardId: string
) => {
  const user = await getUserServer();
  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const validation = UpdateListSchema.safeParse(formData);
  if (!validation.success) {
    return { error: 'Invalid fields' };
  }

  const items = validation.data;

  try {
    const transaction = items.map((item) =>
      db.list.update({
        where: { id: item.id, boardId },
        data: { position: item.position },
      })
    );
    await db.$transaction(transaction);
    revalidatePath(`/board/${boardId}`);
    return { success: `List reordered` };
  } catch (error) {
    return { error: 'Internal server error' };
  }
};
