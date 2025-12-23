import { moveCard } from '../storage/storage';
import { rerender } from '../components/Column'; 

let draggedCardId = null;
let fromColumnId = null;

export const initDnD = () => {
  document.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    draggedCardId = card.dataset.id;
    fromColumnId = card.closest('.column').dataset.columnId;
    e.dataTransfer.effectAllowed = 'move';
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    const toColumn = e.target.closest('.column');
    if (!toColumn || !draggedCardId) return;

    const toColumnId = toColumn.dataset.columnId;
    const cards = Array.from(toColumn.querySelectorAll('.card'));
    const mouseY = e.clientY;

    let newIndex = cards.length; 
    for (let i = 0; i < cards.length; i++) {
      const rect = cards[i].getBoundingClientRect();
      if (mouseY < rect.top + rect.height / 2) {
        newIndex = i;
        break;
      }
    }

    moveCard(fromColumnId, toColumnId, draggedCardId, newIndex);
    draggedCardId = null;
    fromColumnId = null;

    rerender();
  });
};

