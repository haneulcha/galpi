import React, { Component, createRef } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }

  addTextarea = () => {};
  drawText = (text) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = `15px serif`;
    ctx.fillStyle = this.props.fontcolor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2, 400);
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
