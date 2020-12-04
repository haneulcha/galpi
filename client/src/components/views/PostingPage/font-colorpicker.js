import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { FontColorsOutlined } from "@ant-design/icons";

export const FontColorPicker = (props) => {
  const [display, setDisplay] = useState(false);
  const { setColor, color } = props;

  const handleColor = (color) => {
    setColor(color.hex);
  };

  const style = {
    fontSize: 36,
    color: color,
    width: "10%",
  };

  return (
    <div className="font-color">
      <FontColorsOutlined onClick={() => setDisplay(!display)} style={style} />
      {display && (
        <div className="sketch-picker">
          <SketchPicker color={color} onChange={handleColor} triangle="hide" />
        </div>
      )}
    </div>
  );
};
