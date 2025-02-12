import React, { useState, useCallback } from 'react';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';
import EditCardModal from './EditCardModal';
import DeleteCardModal from './DeleteCardModal';
import AddCommentModal from './AddCommentModal'; // ENSURE THIS IMPORT IS PRESENT AND CORRECT

const CardDetailsModal = React.memo(({ card, children }) => { // Correct React.memo usage
  const { users, comments } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const cardComments = comments.filter((comment) => comment.cardId === card.id);
  const assignedUser = users.find((user) => user.id === card.assignedTo);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-2/3"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex justify-between items-start'>
              <h2 className="text-lg font-semibold mb-4">{card.title}</h2>
              <div className='flex gap-1'>
                <EditCardModal card={card} />
                <DeleteCardModal cardId={card.id} />
              </div>
            </div>
            <p className="mb-2">Description: {card.description || 'No description'}</p>
            <p className="mb-2">Due Date: {card.dueDate || 'No due date'}</p>
            <p className="mb-2">Assigned to: {assignedUser ? assignedUser.name : 'Unassigned'}</p>
            <p className="mb-2">Labels: {card.labels?.join(', ') || 'No labels'}</p>

            <h3 className="text-md font-medium mb-2">Comments</h3>
            {cardComments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <p>
                  <strong>{users.find((user) => user.id === comment.userId)?.name}:</strong> {comment.text}
                </p>
              </div>
            ))}
            <AddCommentModal cardId={card.id} /> {/* Ensure AddCommentModal is used as a component */}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
});

export default CardDetailsModal;
