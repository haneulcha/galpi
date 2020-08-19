import React, { useState } from "react";
import Canvas from "./canvas";

const Post = () => {
  const [imgUrl, setImgurl] = useState(); // preview
  const [color, setColor] = useState("#e79797");
  const [fontsize, setFontsize] = useState(15);
  const [fontcolor, setFontcolor] = useState("white");
  const [backgroundOpt, setbackgroundOpt] = useState(false);
  const [quote, setQuote] = useState("인용 한 구절");
  const [content, setContent] = useState();

  function previewUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file); // 파읽을 읽어 버퍼에 저장
    console.log("preview url", url);
    reader.onloadend = () => {
      setImgurl(reader.result);
    };
    setbackgroundOpt(true);
    setColor();
  }

  function colorPick(e) {
    console.log(e.target.value);
    setColor(e.target.value);
    setbackgroundOpt(false);
  }

  return (
    <div>
      <h2>posting page</h2>
      <img
        id="img-preview"
        style={
          (imgUrl ? { display: "inline" } : { display: "hidden" },
          { width: 40, height: 40 })
        }
        src={imgUrl}
        onClick={() => setbackgroundOpt(true)}
        alt="background for quote lines"
      />
      <label htmlFor="canvas-color">배경 색상</label>
      <input type="color" id="canvas-color" onChange={colorPick} />
      <label htmlFor="font-size">글씨 크기</label>
      <input
        type="range"
        id="font-size"
        min={10}
        max={30}
        step={1}
        value={fontsize}
        onChange={(e) => setFontsize(e.target.value)}
      />
      <label htmlFor="font-color">글씨 색상</label>
      <input
        type="color"
        id="font-color"
        onChange={(e) => setFontcolor(e.target.value)}
      />

      <form>
        {"배경 이미지 업로드"}
        <input type="file" accept="image/*" onChange={previewUpload} />
      </form>
      <Canvas
        url={imgUrl}
        color={color}
        opt={backgroundOpt}
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
