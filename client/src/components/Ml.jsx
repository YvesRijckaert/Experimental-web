import React, { Component } from "react";
import { styleTransfer } from "ml5";

class Ml extends Component {
  constructor(props) {
    super(props);
    this.inputImg = React.createRef();
    this.styleA = React.createRef();
  }

  componentDidMount() {
    styleTransfer("../assets/models/techno")
      .then(style1 => style1.transfer(this.inputImg.current))
      .then(result => {
        const newImage1 = new Image(250, 250);
        newImage1.src = result.src;
        newImage1.alt = "test";
        this.styleA.current.appendChild(newImage1);
      });
  }

  render() {
    return (
      <>
        <img ref={this.inputImg} src="assets/img/test.jpg" alt="test" width="250" height="250" />
        <div ref={this.styleA}>
          <img src="assets/img/techno.jpg" alt="test" width="250" height="250" />
        </div>
      </>
    );
  }
}

export default Ml;
