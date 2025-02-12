import React, { useState } from 'react';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';

const EditCardModal = ({ card }) => {
  const { updateCard, users } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);
  const [cardDescription, setCardDescription] = useState(card.description);
  const [cardDueDate, setCardDueDate] = useState(card.dueDate);
  const [cardAssignedTo, setCardAssignedTo] = useState(card.assignedTo);
  const [cardLabels, setCardLabels] = useState(card.labels || []);
  const [newLabel, setNewLabel] = useState('');

  const handleEditCard = () => {
    updateCard(card.id, {
      title: cardTitle,
      description: cardDescription,
      dueDate: cardDueDate,
      assignedTo: cardAssignedTo,
      labels: cardLabels
    });
    setIsOpen(false);
  };

  const handleAddLabel = () => {
    if (newLabel.trim() && !cardLabels.includes(newLabel.trim())) {
      setCardLabels([...cardLabels, newLabel.trim()]);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove) => {
    setCardLabels(cardLabels.filter(label => label !== labelToRemove));
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Edit
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-2/3"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Edit Card</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                placeholder="Enter card title"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                placeholder="Enter card description"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
              <input
                type="date"
                value={cardDueDate}
                onChange={(e) => setCardDueDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Assign To</label>
              <select
                value={cardAssignedTo}
                onChange={(e) => setCardAssignedTo(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label className="block text-gray-700 text-sm font-bold mb-2">Labels</label>
              <div className='flex gap-2'>
                {cardLabels.map(label => (
                  <span key={label} className='bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 flex items-center'>
                    {label}
                    <button onClick={() => handleRemoveLabel(label)} className='ml-1'>x</button>
                  </span>
                ))}
              </div>
              <div className='flex gap-2 mt-2'>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder='Add label'
                  className='p-2 border rounded'
                />
                <button onClick={handleAddLabel} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>Add</button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleEditCard}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
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

export default EditCardModal;
