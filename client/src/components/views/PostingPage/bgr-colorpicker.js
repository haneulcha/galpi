import React from "react";
import { SliderPicker } from "react-color";

export const BgrColorPicker = (props) => {
  const { setColor, color } = props;

  const handleColor = (color) => {
    setColor(color.hex);
  };

  return (
    <>
      <label htmlFor="canvas-color">배경색</label>
      <SliderPicker
        color={color}
        onChange={handleColor}
        className="bgr-colorpicker"
      />
    </>
  );
};
