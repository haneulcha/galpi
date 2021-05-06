import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { FontColorsOutlined } from "@ant-design/icons";

export const useFontColorPicker = (defaultColor) => {
  const [fontcolor, setFontcolor] = useState(defaultColor);
  const [display, setDisplay] = useState(false);

  const handleFontColor = (color) => {
    setFontcolor(color.hex);
  };

  const style = {
    color: fontcolor,
  };

  const FontColorPicker = () => (
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
        <div className="pop-up sketch-picker">
          <SketchPicker
            color={fontcolor}
            onChangeComplete={handleFontColor}
            triangle="hide"
          />
        </div>
      )}
    </div>
  );

  return [fontcolor, FontColorPicker];
};
