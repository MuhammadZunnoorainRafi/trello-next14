import { z } from 'zod';

export const LogSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const OrgSchema = z.object({
  name: z.string().min(1, 'Enter organization name'),
});

export const BoardSchema = z.object({
  name: z.string().min(1, 'Enter board name'),
});

export const ListSchema = z.object({
  title: z.string().min(1, 'Enter list title'),
});

export const UpdateListSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    position: z.number(),
    boardId: z.string(),
  })
);

export const CardSchema = z.object({
  title: z.string().min(1, 'Enter card title'),
  description: z.string().min(1, 'Enter card description'),
});

export const UpdateCardSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.any(),
    position: z.number(),
    listId: z.string(),
  })
);
