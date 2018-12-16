import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Arrow from "../components/Arrow";

import Ml from "../components/Ml";
import CoverUploader from "../components/CoverUploader";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machineImage: ""
    };
  }

  componentDidMount() {
    this.props.changeStatusBar("80");
  }

  handleNewImage(image) {
    this.setState({
      machineImage: image
    });
  }

  render() {
    const { image, accessToken, playlist_id, chosenGenre } = this.props;
    return image === "" || chosenGenre === "" ? (
      <Redirect to="/create" />
    ) : (
      <React.Fragment>
        <section className="main upload">
          <span className="hidden">
            <h2 className="subtitle">Upload to Spotify</h2>
          </span>
          <div className="upload-arrow">
            <Arrow className="arr upload-arr1" />
            <Arrow className="arr upload-arr2" />
            <Arrow className="arr upload-arr3" />
            <Arrow className="arr upload-arr4" />
            <Arrow className="arr upload-arr5" />
          </div>
          <Ml
            image={image}
            chosenGenre={chosenGenre}
            sendImage={image => this.handleNewImage(image)}
          />
          <CoverUploader
            image={this.state}
            accessToken={accessToken}
            playlist_id={playlist_id}
            className="upload-button"
          />
          <div className="upload-by">
            <p>
              A Web Experiment by
              <a
                href="https://yvesrijckaert.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yves Rijckaert
              </a>
              and
              <a
                href="http://seart.be"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arthur Segaert
              </a>
            </p>
          </div>
          <div className="upload-share">
            <ul>
              <li>
                <a href="https://twitter.com">Twitter</a>
              </li>
              <li>
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com">Instagram</a>
              </li>
            </ul>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Upload;
