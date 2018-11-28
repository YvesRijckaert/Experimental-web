import React, { Component } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas2D = React.createRef();
  }

  componentDidMount() {
    const $canvas = this.canvas2D.current;
    const ctx = $canvas.getContext(`2d`);
  }

  render() {
    return (
      <>
        <canvas ref={this.canvas2D} />
      </>
    );
  }
}

export default Canvas;
