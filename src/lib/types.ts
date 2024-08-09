import { z } from 'zod';
import { LogSchema, OrgSchema, RegSchema } from './schemas';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;

export type UserType = RegType & {
  id: string;
};

export type OrgType = z.infer<typeof OrgSchema>;
