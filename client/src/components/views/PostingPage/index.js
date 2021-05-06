import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import domtoimage from "dom-to-image";
import Canvas from "./canvas";
import usePreview from "./preview";
import { BgrColorPicker } from "./bgr-colorpicker";
import useQuoteStyle from "./font";
import { contentPost, imgPost } from "../../../_actions/post_action";
import { errorHandle } from "../../../_actions/error_actions";
import { LoadingOutlined } from "@ant-design/icons";

const Posting = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [url, Preview] = usePreview(); // preview
  const [color, setColor] = useState("#f1f2f6");
  const [quote, setQuote] = useState();
  const [
    fontsize,
    fontcolor,
    fonttype,
    fontalign,
    fontlineheight,
    QuoteStyle,
  ] = useQuoteStyle();
  const [content, setContent] = useState("");

  const [opt, setOpt] = useState(false);
  const [loading, setLoading] = useState(false);

  const loggedIn = useRef();
  const canvasRef = useRef();

  const downloadImage = () => {
    setLoading(true);
    const canvasDiv = canvasRef.current;
    domtoimage.toPng(canvasDiv).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "galpi-image.png";
      link.href = dataUrl;
      link.click();
      setLoading(false);
    });
  };

  const postContent = async (url) => {
    if (!content) {
      return alert("코멘트를 적어주세요");
    }
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
    formData.append("img", img, "combi.png");

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
    domtoimage
      .toBlob(canvasDiv)
      .then((dataUrl) => {
        postImage(dataUrl);
      })
      .catch((err) => console.error("업로드 실패", err));
  };

  useEffect(() => setOpt(true), [url]);
  useEffect(() => setOpt(false), [color]);
  useEffect(() => {
    if (location.pathname === "/postd") {
      loggedIn.current = false;
    } else {
      loggedIn.current = true;
    }
  }, []);

  return (
    <div className="posting">
      <h1 className="page-title">갈피 남기기</h1>

      <div className="canvas-background">
        <span className="instruction">1. 배경 선택</span>
        <div className="canvas-back">
          <Preview />
          <span>OR</span>
          <BgrColorPicker setColor={setColor} color={color} id="canvas-color" />
        </div>
        <span className="instruction">2. 폰트 선택</span>
        <QuoteStyle />
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
          disabled={!loggedIn.current ? true : false}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            !loggedIn.current
              ? "로그인한 유저만 남길 수 있습니다"
              : "작가, 책 제목, 간단한 소감 등을 남겨주세요"
          }
        />
      </div>

      <div className="upload-btn">
        <button onClick={loggedIn.current ? downloadImage : domToImage}>
          {!loading ? (
            !loggedIn.current ? (
              "다운로드"
            ) : (
              "업로드"
            )
          ) : (
            <LoadingOutlined />
          )}
        </button>
      </div>
    </div>
  );
};

export default Posting;
