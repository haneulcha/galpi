import React, { useRef } from "react";
import domtoimage from "dom-to-image";
import axios from "axios";

const Canvas = (props) => {
  const canvasRef = useRef();

  function secondUpload(blob) {
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
        console.log(res.data.url); // 이 부분 수정 이제 어디로 보낼 건지
      })
      .catch((err) => console.error(err));
  }

  const combinedImgUpload = () => {
    const canvasDiv = canvasRef.current;
    domtoimage.toBlob(canvasDiv).then((blob) => {
      console.log(blob);
      secondUpload(blob);
    });
  };

  const { url, color, opt, text, fontcolor, fontsize, setText } = props;

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
    transform: "translate(-50%, -50%)",
  };

  return (
    <div>
      <div id="canvas" style={canvasStyleObj} ref={canvasRef}>
        {opt ? (
          <div className="canvas-bgr" style={bgrStyleObj}>
            <img src={url} />
          </div>
        ) : (
          <div className="canvas-bgr" style={bgrStyleObj} />
        )}
        <textarea
          id="canvas-text"
          position="absolute"
          value={text}
          style={textStyleObj}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button onClick={combinedImgUpload}>이미지 업로드</button>
    </div>
  );
};

//   [ img, text, bgropt]
//   맨 위에 div
//   그 아래에 img(img)/color(div) - 각각 hidden, textarea
//   - img 비율 조정, 위치 조정/color
//   - textarea 크기 조정, 폰트/크기/굵게/
//   => 저장을 domtoimage => 파일은 Submit => 다시 프리뷰 + 코멘트 저장
//   => 첫 이미지는?

// textAlign

export default Canvas;
