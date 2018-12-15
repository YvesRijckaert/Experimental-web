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
        newImage1.alt = "Result image";
        this.styleA.current.appendChild(newImage1);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="upload-start">
        <img
          ref={this.inputImg}
          src={this.props.image}
          alt="Canvas"
          width="250"
          height="250"
        />
        </div>
        <div className="upload-result" ref={this.styleA} />
      </React.Fragment>
    );
  }
}

export default Ml;
