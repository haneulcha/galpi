import React from "react";
import "./papercard.css";

const PaperCard = (props) => {
  return (
    <div id="paper">
      <div className="card-content">
        <div id="pattern">
          <h1 className="card-title">{props.title}</h1>
          <div id="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
