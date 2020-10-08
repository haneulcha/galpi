import React from "react";
import "./papercard.css";

const PaperCard = (props) => {
  return (
    <div id="paper">
      <div className="card-content">
        <h1 className="card-title">{props.title}</h1>
        <div id="pattern">
          <div className="card-image-part">
            <div className="card-image-wrapper">
              <img src="#" alt="should be changed later !!!" />
            </div>
          </div>
          <div id="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
