'use client';
import { ListWithCardsType } from '@/lib/types';
import React, { useState } from 'react';
import CreateListForm from '../forms/CreateListForm';

type Props = {
  data: ListWithCardsType;
};

function ListHeader({ data }: Props) {
  return (
    <div>
      <CreateListForm boardId={data.boardId} data={data} />
    </div>
  );
}

export default ListHeader;
