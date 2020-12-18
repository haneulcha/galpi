import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import domtoimage from "dom-to-image";
import Canvas from "./canvas";
import { Preview } from "./preview";
import { BgrColorPicker } from "./bgr-colorpicker";
import {
  FontSlider,
  FontType,
  FontLineHeight,
  FontAlign,
  FontColorPicker,
} from "./font";
import { contentPost, imgPost } from "../../../_actions/post_action";
import { errorHandle } from "../../../_actions/error_actions";
import { LoadingOutlined } from "@ant-design/icons";

const Posting = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [url, setUrl] = useState(); // preview
  const [color, setColor] = useState("#f1f2f6");
  const [fontsize, setFontsize] = useState(16);
  const [fontcolor, setFontcolor] = useState("black");
  const [fonttype, setFonttype] = useState(
    '"Noto Serif KR", "Times New Roman","Georgia", "serif"'
  );
  const [fontalign, setFontalign] = useState("left");
  const [fontlineheight, setFontlineheight] = useState(20);
  const [opt, setOpt] = useState(false);
  const [quote, setQuote] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef();

  const postContent = async (url) => {
    let data = {
      content,
      url,
    };

    try {
      await dispatch(contentPost(data));
      alert("업로드 성공 !");
      setLoading(false);
      history.replace("/home");
    } catch (e) {
      dispatch(errorHandle(e.response));
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
      dispatch(errorHandle(e.response));
    }
  };

  const domToImage = () => {
    setLoading(true);
    const canvasDiv = canvasRef.current;
    domtoimage.toBlob(canvasDiv).then((blob) => {
      postImage(blob);
    });
  };

  useEffect(() => setOpt(true), [url]);
  useEffect(() => setOpt(false), [color]);

  return (
    <div className="posting">
      <h1 className="page-title">갈피 남기기</h1>

      <div className="canvas-background">
        <span className="instruction">1. 배경 선택</span>
        <div className="canvas-back">
          <Preview setUrl={setUrl} setOpt={setOpt} id="canvas-image" />
          <span>OR</span>
          <BgrColorPicker setColor={setColor} color={color} id="canvas-color" />
        </div>
        <span className="instruction">2. 폰트 선택</span>
        <div className="canvas-font">
          <FontType setFonttype={setFonttype} />
          <FontColorPicker setColor={setFontcolor} color={fontcolor} />
          <FontAlign setFontalign={setFontalign} fontalign={fontalign} />
          <FontSlider setFontsize={setFontsize} />
          <FontLineHeight setFontlineheight={setFontlineheight} />
        </div>
      </div>

      <Canvas
        url={url}
        color={color}
        opt={opt}
        fontcolor={fontcolor}
        fontsize={fontsize}
        fonttype={fonttype}
        quote={quote}
        setQuote={setQuote}
        content={content}
        setContent={setContent}
        canvasRef={canvasRef}
        fontlineheight={fontlineheight}
        fontalign={fontalign}
      />
      <ul className="canvas-desc">
        <li>👁‍🗨 글상자의 크기와 위치를 마우스로 조정할 수 있습니다</li>
        <li>👁‍🗨 이미지의 위치를 조정할 수 있고, 더블클릭 시 초기화 됩니다</li>
        <li>👁‍🗨 글상자 크기를 조절하여 스크롤바를 없애주세요</li>
        <li>👁‍🗨 캔버스 바깥을 클릭하면 글상자 테두리가 사라집니다</li>
      </ul>
      <div className="content">
        <span className="instruction">3. 코멘트 추가</span>
        <label htmlFor="content" style={{ display: "none" }}>
          코멘트
        </label>
        <textarea
          className="content-textarea"
          name="content"
          value={content}
          rows="5"
          onChange={(e) => setContent(e.target.value)}
          placeholder="작가, 책 제목, 간단한 소감 등을 남겨주세요"
        />
      </div>
      <div className="upload-btn">
        <button onClick={domToImage}>
          {!loading ? "업로드" : <LoadingOutlined />}
        </button>
      </div>
    </div>
  );
};

export default Posting;
