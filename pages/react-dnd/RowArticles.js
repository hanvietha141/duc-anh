import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import Article from "./Articles";

const RowArticles = ({ rowData, articlesForRow, items, setItems }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "article",
    drop: (item, monitor) => {
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <RowWrapper>
      <div className="container">
        <label>{rowData.label}</label>
        <div ref={drop} style={getRowStyle(isOver)}>
          {articlesForRow.map((article) => {
            return (
              <Article
                key={article.id}
                content={article.content}
                article={article}
                items={items}
                rowData={rowData}
                setItems={setItems}
              />
            );
          })}
        </div>
      </div>
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  label {
    font-weight: 700;
    color: #000;
  }
`;

const getRowStyle = (isOver) => ({
  display: "flex",
  backgroundColor: isOver ? "lightblue" : "",
});

export default RowArticles;
