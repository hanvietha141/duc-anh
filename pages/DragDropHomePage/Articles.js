import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import Advdefault from 'images/racing-collective/tile-cannot-drag.png';
import AdvPosition from 'images/racing-collective/tile-can-drag.png';

const Article = ({ article, items, rowData, setItems }) => {
  const ref = useRef();
  const [{}, drop] = useDrop(() => ({
    accept: 'article',

    // hover: () => console.log(items),
    drop: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      let hoverItem = article;

      let dragIndex = _.findIndex(items[item.row], i => i.id == item.id);

      let hoverIndex = _.findIndex(
        items[hoverItem.row],
        i => i.id == hoverItem.id,
      );

      if (dragIndex != -1 && hoverIndex != -1) {
        let temp = { ...items };

        //save rowId, index for the drag item
        const newRowForDrag = hoverItem.row;

        //Swap A and B for each other
        temp[hoverItem.row][hoverIndex] = item;
        temp[item.row][dragIndex] = hoverItem;

        //fix row property of item after change position
        temp[item.row][dragIndex].row = item.row;
        temp[newRowForDrag][hoverIndex].row = newRowForDrag;

        setItems(temp);
      }
    },
  }));

  const [{ isDragging }, drag] = useDrag(() => {
    return ({
      type: 'article',
      canDrag: article.canDrag,
      item: {
        id: article.id,
        content: article.content,
        canDrag: article.canDrag,
        row: rowData.id,
        index: article.index,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
  });

  drag(drop(ref));
  return <div style={getItemStyle(article.canDrag, isDragging)} ref={ref}></div>;
};

const getItemStyle = (canDrag, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `5px`,
  height: 300,
  width: '25%',
  // change background colour if dragging
  background: canDrag
    ? `url(${AdvPosition}) no-repeat center center /100%`
    : `transparent url(${Advdefault}) no-repeat center center /100%`,
  opacity: isDragging ? '0.6' : '1',

  // styles we need to apply on draggables
  // ...draggableStyle
});

export default Article;
