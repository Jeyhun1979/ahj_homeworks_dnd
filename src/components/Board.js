import { renderColumn } from './Column';

export const renderBoard = (state) => {
  const board = document.createElement('div');
  board.className = 'board';
  board.style.display = 'flex';
  board.style.gap = '10px';
  board.style.border = '4px solid #1976d2';
  board.style.padding = '10px';
  board.style.minHeight = '400px';

  state.columns.forEach(column => {
    const columnEl = renderColumn(column);
    columnEl.style.flex = '1';
    columnEl.style.border = '2px solid #1976d2';
    columnEl.style.padding = '10px';
    columnEl.style.display = 'flex';
    columnEl.style.flexDirection = 'column';
    columnEl.style.gap = '10px';
    board.append(columnEl);
  });

  return board;
};
