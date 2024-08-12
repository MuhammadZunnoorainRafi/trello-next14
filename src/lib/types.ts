import { z } from 'zod';
import {
  BoardSchema,
  CardSchema,
  ListSchema,
  LogSchema,
  OrgSchema,
  RegSchema,
} from './schemas';
import { Card, List } from '@prisma/client';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;

export type UserType = RegType & {
  id: string;
};

export type OrgType = z.infer<typeof OrgSchema>;
export type BoardType = z.infer<typeof BoardSchema>;
export type ListType = z.infer<typeof ListSchema>;
export type CardType = z.infer<typeof CardSchema>;

export type ListWithCardsType = List & { cards: Card[] };
export type CardWithListType = Card & { list: List };
