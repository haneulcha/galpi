import React, { useState } from "react";
import axios from "axios";
import Canvas from "./canvas";

const Post = () => {
  const [imgUrl, setImgurl] = useState();
  const [color, setColor] = useState("#e79797");
  const [fontcolor, setFontcolor] = useState("white");
  const [backgroundOpt, setbackgroundOpt] = useState(false);
  const [text, setText] = useState("인용 한 구절");

  function imgUpload(e) {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("img", img);
    axios.post("/api/post/img", formData).then((res) => {
      console.log(res);
      setImgurl(res.data.url);
    });
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
      />
      <input type="color" id="canvas-color" onChange={colorPick} />

      <form method="post" action="/post" encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={imgUpload} />
        <input type="hidden" name="url" value={imgUrl} />
        {/* <textarea name="content" maxLength={1000}></textarea> */}
        <button type="submit">올리기</button>
      </form>
      <Canvas
        url={imgUrl}
        color={color}
        opt={backgroundOpt}
        text={text}
        fontcolor={fontcolor}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Post;
