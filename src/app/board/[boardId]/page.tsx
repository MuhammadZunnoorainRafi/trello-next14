import ListContainer from '@/components/board/ListContainer';
import db from '@/lib/db';
import React from 'react';

type Props = {
  params: {
    boardId: string;
  };
};
async function BoardPage({ params }: Props) {
  const lists = await db.list.findMany({
    where: { boardId: params.boardId },
    include: { cards: { orderBy: { position: 'asc' } } },
    orderBy: { position: 'asc' },
  });

  console.log(lists);

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
}

export default BoardPage;
