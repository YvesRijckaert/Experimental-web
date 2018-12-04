import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Line from "../components/Line";
import Ml from "../components/Ml";
import CoverUploader from "../components/CoverUploader";

class Upload extends Component {
  componentDidMount() {
    this.props.changeStatusBar("100");
  }
  render() {
    return this.props.image === "" ? (
      <Redirect to="/create" />
    ) : (
      <React.Fragment>
        <div className="decolines">
          <Line pos="horizontal" top="15" right="0" />
          <Line pos="horizontal" top="85" right="15" />
          <Line pos="vertical" top="-15" right="15" />
        </div>
        <section className="upload">
          <h2 className="subtitle">Upload to Spotify</h2>
          <Ml image={this.props.image} />
          <CoverUploader
            image={this.props.image}
            accessToken={this.props.accessToken}
            playlist_id={this.props.playlist_id}
          />
          <Link to={`/create?access_token=${this.props.accessToken}`}>
            ← Previous
          </Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Upload;
