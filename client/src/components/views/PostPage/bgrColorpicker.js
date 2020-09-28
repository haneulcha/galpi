import React from "react";
import { SliderPicker } from "react-color";

export const BgrColorPicker = (props) => {
  const { setColor, color } = props;

  const handleColor = (color) => {
    setColor(color.hex);

    console.log(color.hex);
  };

  const style = {
    width: "300px",
    heigt: "50px",
  };

  return (
    <div style={style}>
      <SliderPicker color={color} onChange={handleColor} />
    </div>
  );
};
