import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LogSchema } from './lib/schemas';
import { getUserByEmail } from './procedures/user/getUserByEmail';
import bcrypt from 'bcryptjs';
import { getUserById } from './procedures/user/getUserById';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/auth/login' },
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub && session) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validations = LogSchema.safeParse(credentials);
        if (validations.success) {
          const { email, password } = validations.data;
          const user = await getUserByEmail(email);
          if (!user) return null;
          const matchedPassword = await bcrypt.compare(password, user.password);
          if (matchedPassword) return user;
        }
        return null;
      },
    }),
  ],
});
