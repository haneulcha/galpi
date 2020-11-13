import React, { useState, useEffect, useRef } from "react";
import Canvas from "./canvas";
import { Slider } from "antd";
import { Preview } from "./preview";
import { BgrColorPicker } from "./bgrColorpicker";
import { FontColorPicker } from "./fontColorpicker";
import domtoimage from "dom-to-image";
import { useDispatch } from "react-redux";
import { contentPost, imgPost } from "../../../_actions/post_action";

const Posting = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(); // preview
  const [color, setColor] = useState("#f1f2f6");
  const [fontsize, setFontsize] = useState(14);
  const [fontcolor, setFontcolor] = useState("black");
  const [opt, setOpt] = useState(false);
  const [quote, setQuote] = useState();
  const [content, setContent] = useState();

  const canvasRef = useRef();

  const postContent = (url) => {
    console.log("we're in postContent", url);
    let data = {
      content,
      url,
    };
    console.log("data is", data);

    dispatch(contentPost(data))
      .then((res) => console.log("content", res))
      .catch((err) => console.error(err));
  };

  const postImage = (blob) => {
    const img = blob;
    const formData = new FormData();
    formData.append("img", img, "combined.png"); // 파일 이름 바꿔야 함

    dispatch(imgPost(formData))
      .then((res) => postContent(res.payload.url))
      .catch((err) => console.error(err));
  };

  const domToImage = () => {
    const canvasDiv = canvasRef.current;
    domtoimage.toBlob(canvasDiv).then((blob) => {
      postImage(blob);
    });
  };

  const labelStyle = {
    display: "none",
  };

  useEffect(() => setOpt(true), [url]);
  useEffect(() => setOpt(false), [color]);

  return (
    <div className="posting">
      <h1 className="page-title">갈피 남기기</h1>

      <div className="canvas-background">
        <div className="bgr-image">
          <label htmlFor="canvas-image" style={labelStyle}>
            배경 이미지
          </label>
          <Preview
            url={url}
            setUrl={setUrl}
            setOpt={setOpt}
            id="canvas-image"
          />
        </div>

        <div className="bgr-color">
          <label htmlFor="canvas-color">배경색</label>
          <BgrColorPicker setColor={setColor} color={color} id="canvas-color" />
        </div>

        <div className="canvas-font">
          <label htmlFor="font-size" style={labelStyle}>
            글씨 크기
          </label>
          <Slider
            id="font-size"
            min={5}
            max={50}
            step={1}
            defaultValue={16}
            onChange={(val) => setFontsize(val)}
            className="font-slider"
          />
          <label htmlFor="font-color" style={labelStyle}>
            글씨 색상
          </label>
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
        canvasRef={canvasRef}
      />

      <div className="content">
        <label htmlFor="content" style={labelStyle}>
          코멘트
        </label>
        <textarea
          className="content-textarea"
          name="content"
          value={content}
          rows="5"
          // maxLength=
          onChange={(e) => setContent(e.target.value)}
          placeholder="작가, 책 제목, 간단한 소감 등을 남겨주세요"
        />
      </div>
      <div className="upload-btn">
        <button onClick={domToImage}>업로드</button>
      </div>
    </div>
  );
};

export default Posting;
