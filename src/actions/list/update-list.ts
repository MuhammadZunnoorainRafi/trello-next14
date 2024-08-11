'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { ListSchema } from '@/lib/schemas';
import { ListType, ListWithCardsType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const action_updateList = async (
  formData: ListType,
  boardId: string,
  listId: string
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

  try {
    await db.list.update({
      where: {
        id: listId,
      },
      data: { title },
    });
    revalidatePath(`/board/${boardId}`);
    return { success: `List "${title}" updated` };
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
};
