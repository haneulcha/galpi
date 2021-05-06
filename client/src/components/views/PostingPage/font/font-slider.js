import React, { useState } from "react";
import { FontSizeOutlined } from "@ant-design/icons";

export const useFontSlider = (defaultSize) => {
  const [fontsize, setFontsize] = useState(defaultSize);
  const fontsizeHandler = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setFontsize(val);
  };
  const FontSlider = () => (
    <div className="font">
      <label htmlFor="font-size" style={{ display: "none" }}>
        글씨 크기
      </label>
      <FontSizeOutlined className="icon" />
      <input
        type="range"
        id="font-size"
        min={5}
        max={50}
        step={1}
        defaultValue={fontsize}
        onMouseUp={fontsizeHandler}
        className="slider"
      />
    </div>
  );
  return [fontsize, FontSlider];
};
