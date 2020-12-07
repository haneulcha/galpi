import React from "react";
import { LineHeightOutlined } from "@ant-design/icons";

export const FontLineHeight = ({ setFontlineheight }) => {
  const fontLineHandler = (e) => {
    e.preventDefault();
    setFontlineheight(e.target.value);
  };

  return (
    <div className="font">
      <label htmlFor="font-lineheight" style={{ display: "none" }}>
        줄 간격
      </label>
      <LineHeightOutlined className="icon" />
      <input
        type="range"
        id="font-lineheight"
        min={18}
        max={50}
        step={1}
        defaultValue={20}
        onChange={fontLineHandler}
        className="slider"
      />
    </div>
  );
};
