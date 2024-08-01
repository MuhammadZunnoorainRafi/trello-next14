'use server';
import { signIn } from '@/auth';
import { LogSchema } from '@/lib/schemas';
import { LogType } from '@/lib/types';
import { getUserByEmail } from '@/procedures/user/getUserByEmail';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

export const action_login = async (formData: LogType) => {
  try {
    const validations = LogSchema.safeParse(formData);
    if (!validations.success) {
      return { error: 'Invalid credentials' };
    }
    const { email, password } = validations.data;

    const user = await getUserByEmail(email);

    if (!user) {
      return { error: 'User not found' };
    }
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return { error: 'Email or Password incorrect' };
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/settings',
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email or Password Incorrect' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
};
