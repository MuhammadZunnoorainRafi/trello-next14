import { ListWithCardsType } from '@/lib/types';
import React from 'react';
import ListHeader from './ListHeader';

type Props = {
  index: string;
  data: ListWithCardsType;
};

function ListItem({ index, data }: Props) {
  return (
    <div className="shrink-0 h-full w-[262px] select-none">
      <ListHeader data={data} />
    </div>
  );
}

export default ListItem;
