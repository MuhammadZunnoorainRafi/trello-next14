import { z } from 'zod';
import { BoardSchema, LogSchema, OrgSchema, RegSchema } from './schemas';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;

export type UserType = RegType & {
  id: string;
};

export type OrgType = z.infer<typeof OrgSchema>;
export type BoardType = z.infer<typeof BoardSchema>;
