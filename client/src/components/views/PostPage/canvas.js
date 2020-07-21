import React, { Component, createRef } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }

  setFont = (canvas, text, args) => {
    const ctx = canvas.getContext("2d");
    const { color, size, font } = args;
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(text, 30, 30, 400);
  };

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { color } = this.props;

    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = color;
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { url, color, opt } = this.props;

    if (opt) {
      const imgObj = new Image();
      imgObj.onload = function () {
        ctx.drawImage(imgObj, 0, 0);
      };
      imgObj.src = url;
    } else {
      console.log("in canvas", color);
      ctx.fillRect(0, 0, 400, 400);
      ctx.fillStyle = color;
    }
  }

  render() {
    return (
      <canvas id="canvas" width="400" height="400" ref={this.canvasRef}>
        <input type="text" />
      </canvas>
    );
  }
}

export default Canvas;
