'use client';
import { ListWithCardsType } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import CreateListForm from '../forms/CreateListForm';
import ListItem from './ListItem';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { action_updateListOrder } from '@/actions/list/update-list-order';
import { toast } from 'sonner';

type Props = {
  boardId: string;
  data: ListWithCardsType[];
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  //
  return result;
}

function ListContainer({ boardId, data }: Props) {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === 'list') {
      const listItems = reorder(
        orderedData,
        source.index,
        destination.index
      ).map((listItem, index) => ({ ...listItem, position: index }));
      setOrderedData(listItems);
      // TODO: Trigger server action
      const resUpdateList = await action_updateListOrder(listItems, boardId);
      if (resUpdateList.success) {
        toast.success(resUpdateList.success);
      }
      if (resUpdateList.error) {
        toast.error(resUpdateList.error);
      }
    }

    // User moves a card
    if (type === 'card') {
      const newOrderedData = [...orderedData];

      // Source and Destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // Check if sourceList cards exists
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if destinationList cards exists
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((val, ind) => {
          val.position = ind;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        // TODO: Trigger server action

        // User moves the card to another list
      } else {
        // Remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // change card list Id
        movedCard.listId = destination.droppableId;

        // Add card to destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // change the position of the card
        sourceList.cards.forEach((card, ind) => {
          card.position = ind;
        });

        destinationList.cards.forEach((card, ind) => {
          card.position = ind;
        });

        // TODO: Trigger server action
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-2"
          >
            {orderedData.map((val, ind) => (
              <ListItem key={val.id} index={ind} data={val} />
            ))}
            {provided.placeholder}
            <CreateListForm boardId={boardId} />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ListContainer;
