'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_deleteList = async (listId: string) => {
  try {
    const deletedList = await db.list.delete({ where: { id: listId } });
    revalidatePath(`/board/${deletedList.boardId}`);
    return { success: `List "${deletedList.title}" deleted` };
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
};
