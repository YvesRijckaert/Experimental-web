import React, { Component } from "react";
import { styleTransfer } from "ml5";

class Ml extends Component {
  constructor(props) {
    super(props);
    this.inputImg = React.createRef();
    this.styleA = React.createRef();
  }

  handleClickButton(e) {
    let newImage1;
    styleTransfer(`../assets/models/${this.props.chosenGenre.toLowerCase()}`)
      .then(style1 => style1.transfer(this.inputImg.current))
      .then(result => {
        newImage1 = new Image(250, 250);
        newImage1.src = result.src;
        newImage1.alt = "Result image";
        this.styleA.current.appendChild(newImage1);
      })
      .then(() => this.props.sendImage(newImage1));
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
        {this.props.chosenGenre === "Techno" ? (
          <button
            onClick={e => this.handleClickButton(e)}
            className="upload-result upload-machinebutton upload-machinebutton-techno"
          >
            <span>technofy me *</span>
          </button>
        ) : (
          <button
            onClick={e => this.handleClickButton(e)}
            className="upload-result upload-machinebutton upload-machinebutton-70s"
          >
            <span>Take me to the 70s *</span>
          </button>
        )}
        <div className="upload-result" ref={this.styleA} />
      </React.Fragment>
    );
  }
}

export default Ml;
