import React, { useState, useEffect, useRef } from "react";
import Canvas from "./canvas";
import { Slider } from "antd";
import { Preview } from "./preview";
import { BgrColorPicker } from "./bgrColorpicker";
import { FontColorPicker } from "./fontColorpicker";
import domtoimage from "dom-to-image";
import { useDispatch } from "react-redux";
import { contentPost, imgPost } from "../../../_actions/post_action";
import { errorHandle } from "../../../_actions/error_actions";

const Posting = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [url, setUrl] = useState(); // preview
  const [color, setColor] = useState("#f1f2f6");
  const [fontsize, setFontsize] = useState(14);
  const [fontcolor, setFontcolor] = useState("black");
  const [opt, setOpt] = useState(false);
  const [quote, setQuote] = useState();
  const [content, setContent] = useState();

  const canvasRef = useRef();

  const postContent = async (url) => {
    let data = {
      content,
      url,
    };
    try {
      await dispatch(dispatch(contentPost(data)));
      alert("업로드 성공 !");
      history.replace("/home");
    } catch (e) {
      dispatch(errorHandle(e));
    }
  };

  const postImage = async (blob) => {
    const img = blob;
    const formData = new FormData();
    formData.append("img", img, "combined.png");

    try {
      let response = await dispatch(imgPost(formData));
      postContent(response.payload.url);
    } catch (e) {
      dispatch(errorHandle(e));
    }
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
