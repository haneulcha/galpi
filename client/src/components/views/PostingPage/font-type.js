import React, { useState } from "react";
import { QuestionOutlined } from "@ant-design/icons";

const FontType = ({ setFonttype }) => {
  const [counter, setCounter] = useState(0);
  const fonts = [
    '"Noto Serif KR", "Times New Roman","Georgia", "serif"',
    '"UhBeeDoolDool", "Dotum", "Caflisch Script", "Adobe Poetica", "Sanvito", "Ex Ponto", "cursive" ',
    '"Noto Sans KR", "Verdana", "Malgun Gothic", "sans-serif"',
  ];

  const fontTypeHandler = () => {
    setFonttype(fonts[counter]);
    setCounter(counter + 1);
    if (counter === fonts.length - 1) return setCounter(0);
  };
  return (
    <div className="font">
      <label htmlFor="font-type" style={{ display: "none" }}>
        글씨 종류
      </label>
      <QuestionOutlined className="icon" onClick={fontTypeHandler} />
    </div>
  );
};

export default FontType;
