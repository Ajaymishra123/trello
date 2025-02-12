import React from 'react';
import { useAppStore } from '../store';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { motion } from 'framer-motion';
import CreateCardModal from './CreateCardModal';

const CardList = React.memo(({ boardId, lists }) => {
  const { cards } = useAppStore();

  return (
    <div className="flex flex-col gap-2">
      {lists.map((list) => (
        <motion.div
          key={list.id}
          className="bg-gray-100 rounded-md p-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-md font-medium mb-2">{list.title}</h3>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cards
                  .filter((card) => card.listId === list.id)
                  .map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateCardModal listId={list.id} />
        </motion.div>
      ))}
    </div>
  );
});

export default CardList;
