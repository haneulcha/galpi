import React, { useState, useEffect } from "react";
import Canvas from "./canvas";
import { Slider } from "antd";
import { Preview } from "./preview";
import { BgrColorPicker } from "./bgrColorpicker";
import { FontColorPicker } from "./fontColorpicker";

const Post = () => {
  const [url, setUrl] = useState(); // preview
  const [color, setColor] = useState("#e79797");
  const [fontsize, setFontsize] = useState(16);
  const [fontcolor, setFontcolor] = useState("white");
  const [opt, setOpt] = useState(false);
  const [quote, setQuote] = useState();
  const [content, setContent] = useState();

  // function previewUpload(e) {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   let url = reader.readAsDataURL(file); // 파읽을 읽어 버퍼에 저장
  //   console.log("preview url", url);
  //   reader.onloadend = () => {
  //     setImgurl(reader.result);
  //   };
  //   setbackgroundOpt(true);
  //   setColor();
  // }

  // function colorPick(e) {
  //   console.log(e.target.value);
  //   setColor(e.target.value);
  //   setOpt(false);
  // }

  // const ref = React.createRef();

  const sliderStyle = {
    width: "300px",
    heigh: "50px",
  };

  useEffect(() => setOpt(true), [url]);
  useEffect(() => setOpt(false), [color]);

  return (
    <div>
      <h1>갈피 남기기</h1>

      <div className="canvas-opt">
        <div className="canvas-background">
          {/* <label htmlFor="canvas-image">배경 이미지</label> */}
          <Preview
            url={url}
            setUrl={setUrl}
            setOpt={setOpt}
            setColor={setColor}
            id="canvas-image"
          />
          <label htmlFor="canvas-color">배경색</label>
          <BgrColorPicker setColor={setColor} color={color} />
        </div>

        <div className="canvas-font">
          <label htmlFor="font-size">글씨 크기</label>
          <Slider
            id="font-size"
            min={5}
            max={40}
            step={1}
            defaultValue={16}
            onChange={(val) => setFontsize(val)}
            style={sliderStyle}
          />
          <label htmlFor="font-color">글씨 색상</label>

          <FontColorPicker setColor={setFontcolor} color={fontcolor} />
        </div>
      </div>

      <Canvas
        url={url}
        color={color}
        opt={opt}
        fontcolor={fontcolor}
        fontsize={fontsize}
        quote={quote}
        setQuote={setQuote}
        content={content}
        setContent={setContent}
      />
    </div>
  );
};

export default Post;
