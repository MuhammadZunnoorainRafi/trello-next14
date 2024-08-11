'use client';
import { ListWithCardsType } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import CreateListForm from '../forms/CreateListForm';
import ListItem from './ListItem';

type Props = {
  boardId: string;
  data: ListWithCardsType[];
};

function ListContainer({ boardId, data }: Props) {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data, setOrderedData]);

  return (
    <div>
      <ol className="flex gap-x-2">
        {orderedData.map((val, ind) => (
          <ListItem key={val.id} index={val.id} data={val} />
        ))}

        <CreateListForm boardId={boardId} />
        <div className="flex-shrink-0 w-1" />
      </ol>
    </div>
  );
}

export default ListContainer;
