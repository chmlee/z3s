import {
  useDragDropContext,
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { createSignal, For, onMount } from "solid-js";

import style from './SortableList.module.css';

const Sortable = (props) => {
  const sortable = createSortable(props.item.id);
  const [state] = useDragDropContext();
  return (
    <div
      use:sortable
      class="sortable"
      classList={{
        "opacity-25": sortable.isActiveDraggable,
        "transition-transform": !!state.active.draggable,
      }}
    >
    {props.item.toDom()}
    </div>
  );
};

export const SortableList = (props) => {
  const [items, setItems] = createSignal([]);
  onMount(() => setItems(props.items))
  const [activeItem, setActiveItem] = createSignal(null);
  const ids = () => items().map(item => item.id);

  const onDragStart = ({ draggable }) => {
    if (draggable.typ) 
    setActiveItem(draggable.id)
  };

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = items();
      const fromIndex = ids().indexOf(draggable.id);
      const toIndex = ids().indexOf(droppable.id);
      console.log(fromIndex, toIndex)
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
  };
  
  const exportItems = () => {
    let subtitleBuffer = null;
    let subtitle = null;
    let h5Buffer = null;
    let sections = null;
    items().map(item => {
      if (item.typ === "article") {
        articles.push(item)
      } else {
        // clean up previous buffer
        if (articles.length > 0) {
          if (titles.length > 1) {
            let title = titles.pop();

          }
        }
        titles.push(item)
      }
    })
    console.log(titles)
  }

  return (
      <div className={style.container}>
        <DragDropProvider
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          collisionDetector={closestCenter}
        >
          <DragDropSensors />
          <div class="column self-stretch">
            <SortableProvider ids={ids()}>
              <For each={items()}>{(item) => <Sortable item={item} />}</For>
            </SortableProvider>
          </div>
          <button onClick={exportItems}>EXPORT</button>
        </DragDropProvider>
      </div>
  );
};

