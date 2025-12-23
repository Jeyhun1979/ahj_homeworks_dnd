import { createCard } from './Card';
import { addCard, getState } from '../storage/storage';
import { renderBoard } from './Board';

export const renderColumn = ({ id, title, cards }) => {
  const column = document.createElement('div');
  column.className = 'column';
  column.dataset.columnId = id;

  const header = document.createElement('h3');
  header.textContent = title;

  const list = document.createElement('div');
  list.className = 'card-list';
  list.append(...cards.map(card => createCard(card, id)));

  const addButton = document.createElement('button');
  addButton.className = 'add-card';
  addButton.textContent = 'Add another card';

  addButton.addEventListener('click', () => {
    const form = createAddForm(id);
    addButton.replaceWith(form);
  });

  column.append(header, list, addButton);
  return column;
};

const createAddForm = (columnId) => {
  const form = document.createElement('div');
  form.className = 'add-form';

  const input = document.createElement('textarea');
  input.placeholder = 'Enter a title for this card...';

  const actions = document.createElement('div');
  actions.className = 'actions';

  const add = document.createElement('button');
  add.className = 'confirm';
  add.textContent = 'Add';

  const cancel = document.createElement('button');
  cancel.className = 'cancel';
  cancel.textContent = '✖';

  add.addEventListener('click', () => {
    if (!input.value.trim()) return;
    addCard(columnId, input.value.trim());
    rerender();
  });

  cancel.addEventListener('click', () => {
    rerender();
  });

  actions.append(add, cancel);
  form.append(input, actions);
  return form;
};

export const rerender = () => {
  const root = document.querySelector('#root');
  root.innerHTML = '';
  root.append(renderBoard(getState()));
};

