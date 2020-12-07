import React, { useState, useEffect } from "react";

const Canvas = ({
  url,
  color,
  opt,
  quote,
  fontcolor,
  fontsize,
  fonttype,
  fontlineheight,
  setQuote,
  canvasRef,
  fontalign,
}) => {
  const [quoteClickStart, setQuoteClickStart] = useState({ x: 0, y: 0 });
  const [quoteXY, setQuoteXY] = useState({ x: 200, y: 200 });
  const [imgClickStart, setImgClickStart] = useState({ x: 0, y: 0 });
  const [imgXY, setImgXY] = useState({ x: 0, y: 0 });
  const [resize, setResize] = useState("none");
  const [quoteCursor, setQuoteCursor] = useState("grab");
  const [imgCursor, setImgCursor] = useState("move");

  const bgrStyleObj = {
    backgroundColor: color,
    cursor: imgCursor,
  };

  const textStyleObj = {
    color: fontcolor,
    fontSize: `${fontsize}px`,
    fontFamily: fonttype,
    lineHeight: `${fontlineheight}px`,
    resize,
    top: quoteXY.y,
    left: quoteXY.x,
    cursor: quoteCursor,
    textAlign: fontalign,
  };

  const imgPos = {
    top: imgXY.y,
    left: imgXY.x,
  };

  const handleDragStart = (e, cb) => {
    setQuoteCursor("grabbing");
    setImgCursor("grabbing");
    const x = e.clientX;
    const y = e.clientY;
    cb({ x, y });
  };

  const handleDragEndQuote = (e) => {
    setQuoteCursor("grab");
    let distanceX = e.clientX - quoteClickStart.x;
    let distanceY = e.clientY - quoteClickStart.y;
    setQuoteXY({ x: quoteXY.x + distanceX, y: quoteXY.y + distanceY });
  };

  const handleDragEndImg = (e) => {
    setImgCursor("move");
    let distanceX = e.clientX - imgClickStart.x;
    let distanceY = e.clientY - imgClickStart.y;
    setImgXY({
      x: imgXY.x + distanceX,
      y: imgXY.y + distanceY,
    });
  };

  useEffect(() => {
    setImgXY({ x: 0, y: 0 });
  }, [url]);

  return (
    <section className="canvas-wrapper">
      <div id="canvas" className="canvas" ref={canvasRef}>
        {opt ? (
          <div className="canvas-bgr" style={bgrStyleObj}>
            <img
              src={url}
              alt="background for quote lines"
              draggable="true"
              onDoubleClick={() => setImgXY({ x: 0, y: 0 })}
              onDragStart={(e) => {
                handleDragStart(e, setImgClickStart);
              }}
              onDragEnd={(e) => {
                handleDragEndImg(e);
              }}
              style={imgPos}
            />
          </div>
        ) : (
          <div className="canvas-bgr" style={bgrStyleObj} />
        )}

        <textarea
          className="quote-textarea"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          defaultValue={`마음에 드는 구절을 입력하세요`}
          style={textStyleObj}
          draggable="true"
          onFocus={() => setResize("both")}
          onBlur={() => setResize("none")}
          onDragStart={(e) => {
            handleDragStart(e, setQuoteClickStart);
          }}
          onDragEnd={(e) => {
            handleDragEndQuote(e);
          }}
        />
      </div>
    </section>
  );
};

export default Canvas;
