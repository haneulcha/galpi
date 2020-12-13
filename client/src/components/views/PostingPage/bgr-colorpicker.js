import React from "react";
import { ChromePicker } from "react-color";

export const BgrColorPicker = (props) => {
  const { setColor, color } = props;

  const handleColor = (color) => {
    setColor(color.hex);
  };

  return (
    <div className="canvas-color">
      <label htmlFor="canvas-color" style={{ display: "none" }}>
        배경색
      </label>
      <ChromePicker
        color={color}
        onChange={handleColor}
        className="bgr-colorpicker"
      />
    </div>
  );
};
