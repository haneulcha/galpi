import React, { Component, createRef } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }
  wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    var words = text.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  };

  drawText = (text) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const maxWidth = 300;
    const lineHeight = 24;
    const x = canvas.width / 5;
    const y = canvas.height / 5;
    ctx.font = `20px serif`;
    ctx.fillStyle = this.props.fontcolor;
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText(text, x, y, 400);
    this.wrapText(ctx, text, x, y, maxWidth, lineHeight);
  };

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { color, text } = this.props;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 400, 400);
    this.drawText(text);
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { url, color, text, opt } = this.props;
    const drawText = this.drawText;
    if (opt) {
      const imgObj = new Image();
      imgObj.onload = function () {
        ctx.drawImage(imgObj, 0, 0);
        drawText(text);
      };
      imgObj.src = url;
    } else {
      console.log("in canvas", color);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 400, 400);
      this.drawText(text);
    }
  }

  render() {
    return (
      <div>
        <canvas
          id="canvas"
          width="400"
          height="400"
          ref={this.canvasRef}
          //   onClick={}
        ></canvas>
      </div>
    );
  }
}

export default Canvas;
