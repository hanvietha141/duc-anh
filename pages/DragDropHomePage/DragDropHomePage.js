import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { forEach, isEmpty, findIndex, isUndefined, head, isObject, values } from 'lodash';

import RowArticles from './RowArticles';

const DragDropHomePage = ({ selectedNumber, dragDetail, items, setItems }) => {
  useEffect(() => {
    let temp = {...items}
    forEach(temp.rowOrder, row => {
      forEach(temp[row.id], item => {
        item.canDrag = false;
      });
    });

    if (values(dragDetail) && values(dragDetail).length) {
      if (dragDetail.features) {
        dragDetail.features.map(index => {
          temp.feature[index].canDrag = true
        })
      }
      if (dragDetail.news) {
        dragDetail.news.map(index => {
          temp.news[index].canDrag = true
        })
      } 
      if (dragDetail.horses) {
        dragDetail.horses.map(index => {
          temp.horsesForSale[index].canDrag = true
        })
      } 
    } else {
      if (selectedNumber.id === 1) {
        temp.feature[0].canDrag = true;
      } else if (selectedNumber.id === 2) {
        temp.feature[0].canDrag = true;
        temp.news[0].canDrag = true;
      } else if (selectedNumber.id === 3) {
        temp.feature[0].canDrag = true;
        temp.news[0].canDrag = true;
        temp.horsesForSale[0].canDrag = true;
      }
    }
    console.log(temp);

    setItems(temp);
  }, [dragDetail, selectedNumber]);

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        {items.rowOrder.map(rowData => {
          const articlesForRow = items[rowData.id];
          return (
            <div key={rowData.id}>
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
    </div>
  );
};

export default DragDropHomePage;
