import { z } from 'zod';
import {
  BoardSchema,
  CardSchema,
  ListSchema,
  LogSchema,
  OrgSchema,
  RegSchema,
  UpdateCardSchema,
  UpdateListSchema,
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
export type UpdateListOrderType = z.infer<typeof UpdateListSchema>;
export type CardType = z.infer<typeof CardSchema>;
export type UpdateCardOrderType = z.infer<typeof UpdateCardSchema>;

export type ListWithCardsType = List & { cards: Card[] };
export type CardWithListType = Card & { list: List };
