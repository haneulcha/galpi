import React, { useRef } from "react";
import domtoimage from "dom-to-image";

function Canvas() {
  const canvasRef = useRef();

  completeImgUpload = () => {
    const canvasDiv = canvasRef.current;
    domtoimage.toPng(canvasDiv).then((dataUrl) => {});
  };

  const { url, color, opt, text, fontcolor, fontsize } = this.props;
  const textStyleObj = {
    color: fontcolor,
    fontSize: fontsize,
  };
  const bgrStyleObj = {
    width: 400,
    height: 400,
    backgroundColor: color,
  };

  return (
    <div>
      <div id="canvas" width="400" height="400" ref={canvasRef}>
        {opt ? (
          <img src={url} style={bgrStyleObj} />
        ) : (
          <div style={bgrStyleObj} />
        )}
        <textarea value={text} style={textStyleObj} />
      </div>
      <button onClick={completeImgUpload}></button>
    </div>
  );
}

//   [ img, text, bgropt]
//   맨 위에 div
//   그 아래에 img(img)/color(div) - 각각 hidden, textarea
//   - img 비율 조정, 위치 조정/color
//   - textarea 크기 조정, 폰트/크기/굵게/
//   => 저장을 domtoimage => 파일은 Submit => 다시 프리뷰 + 코멘트 저장
//   => 첫 이미지는?

// textAlign

export default Canvas;
