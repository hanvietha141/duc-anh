import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {dropWhile} from "lodash";

// import Advdefault from 'images/racing-collective/tile-cannot-drag.png';
// import AdvPosition from 'images/racing-collective/tile-can-drag.png';

const Article = ({ article, items, rowData, setItems }) => {
  const ref = useRef();
  const [{}, drop] = useDrop(() => ({
    accept: "article",

    // hover: () => console.log(items),
    drop: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      if (item.row == article.row) {
        return;
      }

      if (
        article.row == "feature5" ||
        article.row == "feature6" ||
        article.row == "feature9" ||
        article.row == "feature10"
      ) {
        return;
      }

      // drag item
      console.log("item", item);

      // drop item
      let hoverItem = article;
      console.log("article", article);

      //swap
      let dragIndex = _.findIndex(items[item.row], (i) => i.id == item.id);

      let hoverIndex = _.findIndex(
        items[hoverItem.row],
        (i) => i.id == hoverItem.id
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
      // end swap

      // change position
      // let temp = { ...items };
      // const newRowOfDragItem = dropWhile(temp[item.row], (i) => i.id == item.id);
      // const oldRowOfItem = item.row;
      // item.row = article.row;
      // const newRowOfDropItem = [...temp[article.row], item];
      // temp[oldRowOfItem] = newRowOfDragItem;

      // temp[article.row] = newRowOfDropItem;
      // console.log('newRowOfDragItem', newRowOfDragItem)
      // console.log('newRowOfDropItem', newRowOfDropItem)
      // console.log('temp', temp)
      // setItems(temp); 
      // end change position
    },
  }));

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: "article",
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
    };
  });

  drag(drop(ref));
  return (
    <div style={getItemStyle(article.canDrag, isDragging)} ref={ref}>
      {article.content}
    </div>
  );
};

const getItemStyle = (canDrag, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `5px`,
  height: 80,
  // width: '25%',
  // change background colour if dragging
  // background: canDrag
  //   ? `url(${AdvPosition}) no-repeat center center /100%`
  //   : `transparent url(${Advdefault}) no-repeat center center /100%`,
  // opacity: isDragging ? '0.6' : '1',

  // styles we need to apply on draggables
  // ...draggableStyle
});

export default Article;
