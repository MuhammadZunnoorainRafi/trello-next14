import { ListWithCardsType } from '@/lib/types';
import React from 'react';
import CreateListForm from '../forms/CreateListForm';

type Props = {
  boardId: string;
  data: ListWithCardsType[];
};

function ListContainer({ boardId, data }: Props) {
  return (
    <div>
      <ol>
        <CreateListForm boardId={boardId} />
        <div className="flex-shrink-0 w-1" />
      </ol>
    </div>
  );
}

export default ListContainer;
