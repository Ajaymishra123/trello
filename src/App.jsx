import React, { useEffect, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import BoardList from './components/BoardList';
import { useAppStore } from './store';
import { motion } from 'framer-motion';
import CreateBoardModal from './components/CreateBoardModal';

const App = React.memo(() => {
  const { boards, lists, cards, loadData, moveCard, moveList, addBoard } = useAppStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onDragEnd = useCallback((result) => {
    console.log("Drag ended:", result);

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      console.log("No destination");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Same position");
      return;
    }

    if (type === 'list') {
      console.log("Moving list");
      moveList(source.index, destination.index);
    } else if (type === 'card') {
      console.log("Moving card");
      moveCard(source, destination, draggableId);
    } else {
      console.log("Unknown drag type:", type);
    }
  }, [moveCard, moveList]);

  return (
    <div className="p-4">
      <motion.h1
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trello Clone
      </motion.h1>
      <CreateBoardModal />

      <DragDropContext onDragEnd={onDragEnd}>
        <BoardList />
      </DragDropContext>
    </div>
  );
});

export default App;
