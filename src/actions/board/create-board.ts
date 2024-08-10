'use server';

import db from '@/lib/db';
import { BoardSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

type Props = {
  name: string;
  orgId: string;
};
export const action_createBoard = async ({ name, orgId }: Props) => {
  const validation = BoardSchema.safeParse({ name });
  if (!validation.success) {
    return { error: 'Invalid fields' };
  }

  const { name: nameB } = validation.data;
  try {
    await db.board.create({ data: { name: nameB, organizationId: orgId } });
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
  revalidatePath(`/organization/${orgId}`);
};