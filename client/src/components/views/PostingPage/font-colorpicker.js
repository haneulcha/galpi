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
    color: color,
  };

  return (
    <div className="font">
      <label htmlFor="font-color" style={{ display: "none" }}>
        글씨 색상
      </label>
      <FontColorsOutlined
        className="icon"
        onClick={() => setDisplay(!display)}
        style={style}
      />
      {display && (
        <div className="sketch-picker">
          <SketchPicker color={color} onChange={handleColor} triangle="hide" />
        </div>
      )}
    </div>
  );
};
