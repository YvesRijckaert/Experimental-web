import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Arrow from "../components/Arrow";

import Ml from "../components/Ml";
import CoverUploader from "../components/CoverUploader";

class Upload extends Component {
  componentDidMount() {
    this.props.changeStatusBar("80");
  }
  render() {
    const { image, accessToken, playlist_id } = this.props;
    return image === "" ? (
      <Redirect to="/create" />
    ) : (
        <React.Fragment>
          <section className="main upload">
            <span className="hidden"><h2 className="subtitle">Upload to Spotify</h2></span>
            <div className="upload-arrow">
              <Arrow className="arr upload-arr1" />
              <Arrow className="arr upload-arr2" />
              <Arrow className="arr upload-arr3" />
              <Arrow className="arr upload-arr4" />
              <Arrow className="arr upload-arr5" />
            </div>
            <Ml image={image} />
                <CoverUploader
                image={image}
                accessToken={accessToken}
                playlist_id={playlist_id}
                className="upload-button"
              />
            <div className="upload-by">
              <p>A Web Experiment by <a href="https://yvesrijckaert.com/" target="_blank">Yves Rijckaert</a> and <a href="http://seart.be" target="_blank">Arthur Segaert</a></p>
            </div>
            <div className="upload-share">
              <ul>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </section>
        </React.Fragment>
      );
  }
}

export default Upload;
