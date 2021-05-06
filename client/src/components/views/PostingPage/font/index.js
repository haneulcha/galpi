import React from "react";
import { useFontAlign } from "./font-align";
import { useFontColorPicker } from "./font-colorpicker";
import { useFontLineHeight } from "./font-lineheight";
import { useFontSlider } from "./font-slider";
import { useFontType } from "./font-type";

const useQuoteStyle = () => {
  const [fontsize, FontSlider] = useFontSlider(16);
  const [fontcolor, FontColorPicker] = useFontColorPicker("black");
  const [fonttype, FontType] = useFontType(
    '"Noto Serif KR", "Times New Roman","Georgia", "serif"'
  );
  const [fontalign, FontAlign] = useFontAlign("left");
  const [fontlineheight, FontLineHeight] = useFontLineHeight(20);

  const QuoteStyle = () => (
    <div className="canvas-font">
      <FontType />
      <FontColorPicker />
      <FontAlign />
      <FontSlider />
      <FontLineHeight />
    </div>
  );

  return [fontsize, fontcolor, fonttype, fontalign, fontlineheight, QuoteStyle];
};

export default useQuoteStyle;
