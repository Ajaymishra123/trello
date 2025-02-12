import React, { useState, useCallback } from 'react';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';

const DeleteCardModal = React.memo(({ cardId }) => {
  const { deleteCard } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  // ENSURE '=' IS HERE:
  const handleDeleteCard = useCallback(() => {
    deleteCard(cardId);
    setIsOpen(false);
  }, [cardId, deleteCard]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <motion.button
        onClick={handleOpen}
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
            <h2 className="text-lg font-semibold mb-4">Delete Card</h2>
            <p>Are you sure you want to delete this card?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteCard}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={handleClose}
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
});

export default DeleteCardModal;
