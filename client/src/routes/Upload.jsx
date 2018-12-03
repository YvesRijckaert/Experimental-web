import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Ml from "../components/Ml";
import CoverUploader from "../components/CoverUploader";

class Upload extends Component {
  componentDidMount() {
    this.props.changeStatusBar('100');
  }
  render() {
    return this.props.image === "" ? (
      <Redirect to="/create" />
    ) : (
      <section className="upload">
        <h2>Upload to Spotify</h2>
        <Ml image={this.props.image} />
        <CoverUploader
          image={this.props.image}
          accessToken={this.props.accessToken}
          playlist_id={this.props.playlist_id}
        />
        <Link to={`/create?access_token=${this.props.accessToken}`}>← Previous</Link>
      </section>
    );
  }
}

export default Upload;
