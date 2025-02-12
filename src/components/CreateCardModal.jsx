import React, { useState } from 'react';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';

const CreateCardModal = ({ listId }) => {
  const { addCard } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleCreateCard = () => {
    if (cardTitle.trim()) {
      addCard(listId, cardTitle);
      setCardTitle('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-2 w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Card
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Create New Card</h2>
            <input
              type="text"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              placeholder="Enter card title"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCreateCard}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Create
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

export default CreateCardModal;
