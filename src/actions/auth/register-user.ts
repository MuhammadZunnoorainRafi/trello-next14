'use server';
import db from '@/lib/db';
import { RegSchema } from '@/lib/schemas';
import { RegType } from '@/lib/types';
import { getUserByEmail } from '@/procedures/user/getUserByEmail';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export const action_register = async (formData: RegType) => {
  try {
    const validations = RegSchema.safeParse(formData);
    if (!validations.success) {
      return { error: 'Invalid fields' };
    }
    const { name, email, password } = validations.data;

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    if (!user) {
      return { error: 'User not created' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
  redirect('/auth/login');
};
