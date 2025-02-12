import React from 'react';
import { useAppStore } from '../store';
import { Droppable } from 'react-beautiful-dnd';
import Board from './Board';
import { motion } from 'framer-motion';

const BoardList = () => {
  const { boards } = useAppStore();

  return (
    <Droppable droppableId="all-boards" direction="horizontal" type="board">
      {(provided) => (
        <motion.div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex gap-4 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {boards.map((board, index) => (
            <Board key={board.id} board={board} index={index} />
          ))}
          {provided.placeholder}
        </motion.div>
      )}
    </Droppable>
  );
};

export default BoardList;
