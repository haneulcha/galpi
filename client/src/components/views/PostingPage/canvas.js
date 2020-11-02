import React, { useState, useEffect } from "react";

const Canvas = (props) => {
  const [resize, setResize] = useState("none");
  const [quoteTop, setQuoteTop] = useState(200);
  const [quoteLeft, setQuoteLeft] = useState(200);
  const [quoteCursor, setQuoteCursor] = useState("grab");
  const [imgTop, setImgTop] = useState(0);
  const [imgLeft, setImgLeft] = useState(0);
  const [imgCursor, setImgCursor] = useState("move");
  const [imgFit, setImgFit] = useState(true);
  const [curX, setCurX] = useState();
  const [curY, setCurY] = useState();

  // const [overflow, setOverflow] = useState();

  const {
    url,
    color,
    opt,
    quote,
    fontcolor,
    fontsize,
    setQuote,
    canvasRef,
  } = props;

  const bgrStyleObj = {
    backgroundColor: color,
    cursor: imgCursor,
  };

  const textStyleObj = {
    color: fontcolor,
    fontSize: `${fontsize}px`,
    resize,
    top: quoteTop,
    left: quoteLeft,
    cursor: quoteCursor,
  };

  const imgPos = {
    objectPosition: `${imgLeft}px ${imgTop}px`,
    width: `${imgFit ? `100%` : `125%`}`,
  };

  const handleDragStartQuote = () => {
    setQuoteCursor("grabbing");
  };

  const handleDragEndQuote = (e, cbtop, cbleft) => {
    setQuoteCursor("grab");
    let parent = e.target.parentElement.getBoundingClientRect();

    const relativeX = e.clientX - parent.x;
    const relativeY = e.clientY - parent.y;

    cbtop(relativeY);
    cbleft(relativeX);
  };

  const handleDragStartImg = (e, cbtop, cbleft) => {
    setImgCursor("grabbing");
    const x = e.clientX;
    const y = e.clientY;

    cbtop(y);
    cbleft(x);
  };

  const handleDragEndImg = (e, cbtop, cbleft) => {
    setImgCursor("move");
    const x = e.clientX - curX;
    const y = e.clientY - curY;

    cbtop(imgTop + y);
    cbleft(imgLeft + x);
    console.log(imgTop + y, imgLeft + x);
  };

  useEffect(() => {
    setImgLeft(0);
    setImgTop(0);
  }, [url]);

  return (
    <div id="canvas" className="canvas" ref={canvasRef}>
      {opt ? (
        <div className="canvas-bgr" style={bgrStyleObj}>
          <img
            src={url}
            alt="background for quote lines"
            // width="400"
            // height="400"
            draggable="true"
            onDragStart={(e) => {
              handleDragStartImg(e, setCurY, setCurX);
            }}
            onDragEnd={(e) => {
              handleDragEndImg(e, setImgTop, setImgLeft);
            }}
            onDoubleClick={() => setImgFit(!imgFit)}
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
        defaultValue={`여기에 마음에 드는 문장을 적어보세요!`}
        style={textStyleObj}
        draggable="true"
        onFocus={() => setResize("both")}
        onBlur={() => setResize("none")}
        onDragStart={() => {
          handleDragStartQuote();
        }}
        onDragEnd={(e) => {
          handleDragEndQuote(e, setQuoteTop, setQuoteLeft);
        }}
      />
    </div>
  );
};

export default Canvas;