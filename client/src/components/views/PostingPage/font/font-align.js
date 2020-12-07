import React, { useState } from "react";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons";

export const FontAlign = ({ setFontalign, fontalign }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="font" onClick={() => setDisplay(!display)}>
      <label htmlFor="font-align" style={{ display: "none" }}>
        정렬
      </label>
      {fontalign === "left" ? (
        <AlignLeftOutlined />
      ) : "center" ? (
        <AlignCenterOutlined />
      ) : "right" ? (
        <AlignRightOutlined />
      ) : (
        <ColumnWidthOutlined />
      )}
      {display && (
        <div className="pop-up align-opt">
          <AlignLeftOutlined
            onClick={() => {
              setFontalign("left");
              setDisplay(!display);
            }}
          />
          <AlignCenterOutlined
            onClick={() => {
              setFontalign("center");
              setDisplay(!display);
            }}
          />
          <AlignRightOutlined
            onClick={() => {
              setFontalign("right");
              setDisplay(!display);
            }}
          />
          <ColumnWidthOutlined
            onClick={() => {
              setFontalign("justify");
              setDisplay(!display);
            }}
          />
        </div>
      )}
    </div>
  );
};
