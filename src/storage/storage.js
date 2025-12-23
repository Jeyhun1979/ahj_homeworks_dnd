const STORAGE_KEY = 'trelloState';

export const initState = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const state = {
      columns: [
        { id: '1', title: 'ToDo', cards: [] },
        { id: '2', title: 'In Progress', cards: [] },
        { id: '3', title: 'Done', cards: [] },
      ],
    };
    saveState(state);
  }
};

export const getState = () => JSON.parse(localStorage.getItem(STORAGE_KEY));

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const addCard = (columnId, text) => {
  const state = getState();
  const column = state.columns.find(c => c.id === columnId);
  if (!column) return;
  const card = { id: `${Date.now()}`, text };
  column.cards.push(card);
  saveState(state);
};

export const removeCard = (columnId, cardId) => {
  const state = getState();
  const column = state.columns.find(c => c.id === columnId);
  if (!column) return;
  column.cards = column.cards.filter(c => c.id !== cardId);
  saveState(state);
};

export const moveCard = (fromColumnId, toColumnId, cardId, toIndex) => {
  const state = getState();
  const fromColumn = state.columns.find(c => c.id === fromColumnId);
  const toColumn = state.columns.find(c => c.id === toColumnId);
  if (!fromColumn || !toColumn) return;

  const cardIndex = fromColumn.cards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) return;

  const [card] = fromColumn.cards.splice(cardIndex, 1);
  toColumn.cards.splice(toIndex, 0, card);
  saveState(state);
};
