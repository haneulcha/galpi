import React, { useState } from "react";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons";

export const FontAlign = ({ setFontalign, fontalign }) => {
  const [display, setDisplay] = useState(false);

  const iconHandler = () => {
    switch (fontalign) {
      case "left":
        return <AlignLeftOutlined />;
      case "center":
        return <AlignCenterOutlined />;
      case "right":
        return <AlignRightOutlined />;
      case "justify":
        return <ColumnWidthOutlined />;
      default:
        return <AlignLeftOutlined />;
    }
  };

  return (
    <div className="font" onClick={() => setDisplay(!display)}>
      <label htmlFor="font-align" style={{ display: "none" }}>
        정렬
      </label>
      {iconHandler()}
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
