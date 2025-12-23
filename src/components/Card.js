import { removeCard } from '../storage/storage';

export const createCard = (card, columnId) => {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');
  cardEl.draggable = true;
  cardEl.dataset.id = card.id;

  const textEl = document.createElement('span');
  textEl.classList.add('card-text');
  textEl.textContent = card.text;

  const removeEl = document.createElement('span');
  removeEl.classList.add('card-remove');
  removeEl.textContent = '✕';
  removeEl.style.display = 'none';

  cardEl.addEventListener('mouseenter', () => removeEl.style.display = 'inline');
  cardEl.addEventListener('mouseleave', () => removeEl.style.display = 'none');

  removeEl.addEventListener('click', () => {
    removeCard(columnId, card.id);
    cardEl.remove();
  });

  cardEl.append(textEl, removeEl);

  return cardEl;
};

