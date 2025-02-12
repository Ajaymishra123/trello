import React, { useState } from 'react';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';

const AddCommentModal = ({ cardId }) => {
  const { addComment, users } = useAppStore();
  const [commentText, setCommentText] = useState('');
  const [userId, setUserId] = useState(''); // Default to the first user

  const handleAddComment = () => {
    if (commentText.trim() && userId) {
      addComment(cardId, userId, commentText);
      setCommentText('');
    }
  };

    return (
      
        <div className="bg-white rounded-lg  w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Add Comment</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter your comment"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">User</label>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
          </div>
          <div className="flex justify-start">
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim() || !userId}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
            >
              Add Comment
            </button>
          </div>
        </div>
      
    );
};

export default AddCommentModal;
