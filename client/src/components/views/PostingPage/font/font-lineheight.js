import React, { useState } from "react";
import { LineHeightOutlined } from "@ant-design/icons";

export const useFontLineHeight = (defaultValue) => {
  const [fontlineheight, setFontlineheight] = useState(defaultValue);
  const fontLineHandler = (e) => {
    e.preventDefault();
    setFontlineheight(e.target.value);
  };

  const FontLineHeight = () => (
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
        defaultValue={fontlineheight}
        onMouseUp={fontLineHandler}
        className="slider"
      />
    </div>
  );

  return [fontlineheight, FontLineHeight];
};
