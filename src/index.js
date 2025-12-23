import './styles/style.css';

import { initState, getState } from './storage/storage';
import { renderBoard } from './components/Board';
import { initDnD } from './dnd/dragDrop';

const root = document.querySelector('#root');

initState();
root.replaceChildren(renderBoard(getState()));

initDnD();
