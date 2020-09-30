import React from "react";
import { SliderPicker } from "react-color";

export const BgrColorPicker = (props) => {
  const { setColor, color } = props;

  const handleColor = (color) => {
    setColor(color.hex);

    console.log(color.hex);
  };

  return (
    <SliderPicker
      color={color}
      onChange={handleColor}
      className="bgr-colorpicker"
    />
  );
};
