import React, { useState } from "react";
import { TwitterPicker } from "react-color";
import { FontColorsOutlined } from "@ant-design/icons";

export const FontColorPicker = (props) => {
  const [display, setDisplay] = useState(false);
  const { setColor, color } = props;

  const handleColor = (color) => {
    setColor(color.hex);

    console.log(color.hex);
  };

  const style = {
    fontSize: 36,
    color: color,
  };

  return (
    <div>
      <FontColorsOutlined onClick={() => setDisplay(!display)} style={style} />
      {display ? <TwitterPicker color={color} onChange={handleColor} /> : null}
    </div>
  );
};
