/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

import {
  DragDropProvider,
  DragDropSensors,
  createDraggable,
  createDroppable,
  DragDropDebugger,
} from "@thisbeyond/solid-dnd";
import { createSignal, Show } from "solid-js";

const Draggable = (props) => {
  console.log(props.id)
  const draggable = createDraggable(props.id);
  return (
    <div 
      use:draggable 
      style={{ height: '20pt', 'background-color': 'red' }}
    >
      {props.item.text}
    </div>
  );
};


const Droppable = (props) => {
  const droppable = createDroppable(props.id);
  return (
    <div
      use:droppable
      style={{ height: '50pt', 'background-color': 'grey' }}
    >
      {props.children}
    </div>
  );
};

render(() => <App />, root);
