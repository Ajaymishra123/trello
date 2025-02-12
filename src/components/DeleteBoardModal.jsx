import React, { useState } from 'react';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';

const DeleteBoardModal = ({ boardId }) => {
  const { deleteBoard } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteBoard = () => {
    deleteBoard(boardId);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Delete
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Delete Board</h2>
            <p>Are you sure you want to delete this board?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteBoard}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DeleteBoardModal;
