'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { OrgSchema } from '@/lib/schemas';
import { OrgType } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const action_createOrg = async (formData: OrgType) => {
  const user = await getUserServer();
  if (!user || !user.id) {
    return { error: 'User not found' };
  }
  const validation = OrgSchema.safeParse(formData);
  if (!validation.success) {
    return { error: 'Invalid Fields' };
  }

  const { name } = validation.data;
  let organization;
  try {
    organization = await db.organization.create({
      data: { name, userId: user.id },
    });
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
  revalidatePath('/organization');
  redirect(`/organization/${organization.id}`);
};
