import React, { useRef } from "react";
import domtoimage from "dom-to-image";
import axios from "axios";

const Canvas = (props) => {
  const canvasRef = useRef();

  const postContent = (url) => {
    console.log("we're in postContent", url);
    let data = {
      content,
      url,
    };
    console.log("data is", data);
    axios
      .post("/api/post", data)
      .then((res) => {
        console.log("posting finished", res.data);
      })
      .catch((err) => console.error(err));
  };

  const postImage = (blob) => {
    const img = blob;
    const formData = new FormData();
    formData.append("img", img, "combined.png"); // 파일 이름 바꿔야 함
    let config = {
      header: {
        "Content-type": "multipart/form-data",
      },
    };
    axios
      .post("/api/post/img", formData, config)
      .then((res) => {
        console.log("after image posting", res.data.url);
        postContent(res.data.url); // 이 부분 수정 이제 어디로 보낼 건지
      })
      .catch((err) => console.error(err));
  };

  const domToImage = () => {
    const canvasDiv = canvasRef.current;
    domtoimage.toBlob(canvasDiv).then((blob) => {
      console.log("blob", blob);
      postImage(blob);
    });
  };

  const {
    url,
    color,
    opt,
    quote,
    fontcolor,
    fontsize,
    setQuote,
    content,
    setContent,
  } = props;

  const canvasStyleObj = {
    width: 400,
    height: 400,
    position: "relative",
  };
  const bgrStyleObj = {
    width: 400,
    height: 400,
    backgroundColor: color,
    overflow: "hidden",
  };
  const textStyleObj = {
    color: fontcolor,
    fontFamily:
      "'Google Sans', Roboto, Arial, 'Apple SD Gothic Neo', sans-serif",
    fontSize: `${fontsize}px`,
    fontWeight: "normal",
    fontHeight: "1.2 em",
    backgroundColor: "transparent",
    position: "absolute",
    top: "50%",
    left: "50%",
    border: "none",
    overflow: "auto",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div>
      <div id="canvas" style={canvasStyleObj} ref={canvasRef}>
        {opt ? (
          <div className="canvas-bgr" style={bgrStyleObj}>
            <img src={url} alt="background for quote lines" />
          </div>
        ) : (
          <div className="canvas-bgr" style={bgrStyleObj} />
        )}
        <textarea
          id="canvas-text"
          position="absolute"
          value={quote}
          style={textStyleObj}
          onChange={(e) => setQuote(e.target.value)}
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={domToImage}>업로드</button>
    </div>
  );
};

export default Canvas;
