import React from "react";
import { FontSizeOutlined } from "@ant-design/icons";

export const FontSlider = ({ setFontsize }) => {
  const fontsizeHandler = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setFontsize(val);
  };
  return (
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
        defaultValue={16}
        onChange={fontsizeHandler}
        className="slider"
      />
    </div>
  );
};
