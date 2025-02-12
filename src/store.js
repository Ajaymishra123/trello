import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

const USERS = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Jane Smith' },
  { id: 'user-3', name: 'Mike Johnson' },
];

export const useAppStore = create(
  persist(
    (set, get) => ({
      boards: [],
      lists: [],
      cards: [],
      users: USERS,
      comments: [],

      loadData: () => {
        // Data is loaded automatically by zustand-persist
      },

      addBoard: (title) => {
        const newBoard = { id: nanoid(), title };
        set((state) => ({ boards: [...state.boards, newBoard] }));
      },
      updateBoard: (id, updatedFields) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, ...updatedFields } : board
          ),
        }));
      },
      deleteBoard: (id) => {
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
          lists: state.lists.filter(list => list.boardId !== id),
          cards: state.cards.filter(card => !state.lists.find(list => list.boardId === id && list.id === card.listId))
        }));
      },

      addList: (boardId, title) => {
        const newList = { id: nanoid(), boardId, title };
        set((state) => ({ lists: [...state.lists, newList] }));
      },
      updateList: (id, updatedFields) => {
        set((state) => ({
          lists: state.lists.map(list => list.id === id ? { ...list, ...updatedFields } : list)
        }))
      },
      deleteList: (id) => {
        set(state => ({
          lists: state.lists.filter(list => list.id !== id),
          cards: state.cards.filter(card => card.listId !== id)
        }))
      },

      addCard: (listId, title) => {
        const newCard = { id: nanoid(), listId, title, description: '', dueDate: null, assignedTo: '', labels: [] };
        set((state) => ({ cards: [...state.cards, newCard] }));
      },
      updateCard: (id, updatedFields) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...updatedFields } : card
          ),
        }));
      },
      deleteCard: (id) => {
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
          comments: state.comments.filter(comment => comment.cardId !== id)
        }));
      },

      moveCard: (source, destination, draggableId) => {
        console.log("moveCard - source:", source, "destination:", destination, "draggableId:", draggableId); // More detailed logging
        const startList = get().lists.find((list) => list.id === source.droppableId);
        const endList = get().lists.find((list) => list.id === destination.droppableId);
        const card = get().cards.find((card) => card.id === draggableId);

        console.log("moveCard - startList:", startList, "endList:", endList, "card:", card); // More detailed logging


        if (startList === endList) {
          // Reordering within the same list
          console.log("moveCard - same list"); // More detailed logging
          const newCards = [...get().cards];
          const [reorderedCard] = newCards.splice(
            newCards.findIndex((c) => c.id === draggableId),
            1
          );
          newCards.splice(
            newCards.findIndex((c) => c.listId === destination.droppableId) + destination.index,
            0,
            reorderedCard
          );
          console.log("moveCard - newCards:", newCards); // More detailed logging
          set({ cards: newCards });
        } else {
          // Moving between lists
          console.log("moveCard - different list"); // More detailed logging
          const updatedCard = { ...card, listId: destination.droppableId };
          set((state) => ({
            cards: [
              ...state.cards.filter((c) => c.id !== draggableId),
              updatedCard,
            ],
          }));
        }
      },

      moveList: (startIndex, endIndex) => {
        const allLists = [...get().lists];
        const [removed] = allLists.splice(startIndex, 1);
        allLists.splice(endIndex, 0, removed);

        set({ lists: allLists });
      },

      addComment: (cardId, userId, text) => {
        const newComment = { id: nanoid(), cardId, userId, text };
        set((state) => ({ comments: [...state.comments, newComment] }));
      },
    }),
    {
      name: 'trello-clone-storage', // unique name
    }
  )
);
