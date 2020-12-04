import React from "react";

const FontSlider = ({ setFontsize }) => {
  const fontsizeHandler = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setFontsize(val);
  };
  return (
    <input
      type="range"
      id="font-size"
      min={5}
      max={50}
      step={1}
      defaultValue={16}
      onChange={fontsizeHandler}
      className="font-slider"
    />
  );
};

export default FontSlider;
