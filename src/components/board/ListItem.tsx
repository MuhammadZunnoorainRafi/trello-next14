import { ListWithCardsType } from '@/lib/types';
import CreateCardForm from '../forms/CreateCardForm';
import ListHeader from './ListHeader';

type Props = {
  index: string;
  data: ListWithCardsType;
};

function ListItem({ index, data }: Props) {
  const cards = data.cards;
  return (
    <div className="shrink-0 h-full w-[262px] select-none">
      <ListHeader data={data} />
      <div className="space-y-1">
        {cards.map((card) => (
          <div key={card.id} className="rounded-md p-1 bg-slate-800">
            <CreateCardForm
              data={card}
              boardId={data.boardId}
              listId={data.id}
            />
          </div>
        ))}
      </div>
      <CreateCardForm boardId={data.boardId} listId={data.id} />
    </div>
  );
}

export default ListItem;
