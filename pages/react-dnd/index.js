import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  forEach,
  isEmpty,
  findIndex,
  isUndefined,
  head,
  isObject,
  values,
} from "lodash";
import { initialData } from "./data";

import RowArticles from "./RowArticles";
import styled from "styled-components";

const DragDropHomePage = ({}) => {
  const [items, setItems] = useState(initialData); 
  useEffect(() => { 
    let temp = { ...items };
    forEach(temp.rowOrder, (row) => {
      
      forEach(temp[row.id], (item) => {
        // if (row.disabled) {
        //   item.canDrag = false;
        // } else {
          item.canDrag = true;
        // } 
      });
    });

    // if (values(dragDetail) && values(dragDetail).length) {
    //   if (dragDetail.features) {
    //     dragDetail.features.map(index => {
    //       temp.feature[index].canDrag = true
    //     })
    //   }
    //   if (dragDetail.news) {
    //     dragDetail.news.map(index => {
    //       temp.news[index].canDrag = true
    //     })
    //   }
    //   if (dragDetail.horses) {
    //     dragDetail.horses.map(index => {
    //       temp.horsesForSale[index].canDrag = true
    //     })
    //   }
    // } else {
    // if (selectedNumber.id === 1) {
    //   temp.feature[0].canDrag = true;
    // } else if (selectedNumber.id === 2) {
    //   temp.feature[0].canDrag = true;
    //   temp.news[0].canDrag = true;
    // } else if (selectedNumber.id === 3) {
    //   temp.feature[0].canDrag = true;
    //   temp.news[0].canDrag = true;
    // temp.horsesForSale[0].canDrag = true;
    // }
    // }
    // console.log(temp); 

    setItems(temp); 
    console.log(temp)
    console.log('first')
  }, []);
  return (
    <DnDWrapper className="container">
      <DndProvider backend={HTML5Backend}>
        {items.rowOrder.map((rowData) => {
          const articlesForRow = items[rowData.id];
          return (
            <div key={rowData.id} className="row">
              <RowArticles
                rowData={rowData}
                articlesForRow={articlesForRow}
                items={items}
                setItems={setItems} 
              />
            </div>
          );
        })}
      </DndProvider>
    </DnDWrapper> 
  );
};

const DnDWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .row {
    width: 25%;
  }
`;

export default DragDropHomePage;
