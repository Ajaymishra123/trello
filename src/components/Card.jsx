import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import CardDetailsModal from './CardDetailsModal';

const Card = React.memo(({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-2 shadow-md mb-2 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <CardDetailsModal card={card}>
            <p>{card.title}</p>
          </CardDetailsModal>
        </motion.div>
      )}
    </Draggable>
  );
});

export default Card;
