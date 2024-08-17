import { ListWithCardsType } from '@/lib/types';
import CreateCardForm from '../forms/CreateCardForm';
import ListHeader from './ListHeader';
import { Draggable, Droppable } from '@hello-pangea/dnd';

type Props = {
  index: number;
  data: ListWithCardsType;
};

function ListItem({ index, data }: Props) {
  const cards = data.cards;
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provider) => (
        <li
          ref={provider.innerRef}
          {...provider.draggableProps}
          className="shrink-0 h-full w-[270px] rounded-md select-none border border-slate-500 p-1"
        >
          <div {...provider.dragHandleProps}>
            <ListHeader data={data} />
            <Droppable droppableId={data.id} type="card">
              {(provider) => (
                <ol
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  className="space-y-1 py-1"
                >
                  {cards.map((card, ind) => (
                    <Draggable key={card.id} draggableId={card.id} index={ind}>
                      {(providerB) => (
                        <div
                          ref={providerB.innerRef}
                          {...providerB.draggableProps}
                          {...providerB.dragHandleProps}
                          key={card.id}
                          className="rounded-md bg-gray-800"
                        >
                          <CreateCardForm
                            data={card}
                            boardId={data.boardId}
                            listId={data.id}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </ol>
              )}
            </Droppable>
            <CreateCardForm boardId={data.boardId} listId={data.id} />
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default ListItem;
