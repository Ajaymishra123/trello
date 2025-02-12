import React from 'react';
import { useAppStore } from '../store';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import CardList from './CardList';
import CreateListModal from './CreateListModal';
import { motion } from 'framer-motion';
import EditBoardModal from './EditBoardModal';
import DeleteBoardModal from './DeleteBoardModal';

const Board = React.memo(({ board, index }) => {
  const { lists } = useAppStore();
  const boardLists = lists.filter((list) => list.boardId === board.id);

  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided) => (
        <motion.div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-gray-200 rounded-lg p-4 w-80 flex flex-col"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div {...provided.dragHandleProps} className='flex justify-between items-start'>
            <h2 className="text-lg font-semibold mb-2">{board.title}</h2>
            <div className='flex gap-1'>
              <EditBoardModal board={board} />
              <DeleteBoardModal boardId={board.id} />
            </div>
          </div>
          <Droppable droppableId={`board-${board.id}`} type="list">
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="flex flex-col gap-2"
              >
                <CardList boardId={board.id} lists={boardLists} />
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateListModal boardId={board.id} />
        </motion.div>
      )}
    </Draggable>
  );
});

export default Board;
