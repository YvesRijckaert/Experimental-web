import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Line from "../components/Line";
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
          <div className="decolines">
            <Line pos="horizontal" top="10" right="0" />
            <Line pos="horizontal" top="85" right="15" />
            <Line pos="vertical" top="-15" right="15" />
          </div>
          <section className="main upload">
            <h2 className="subtitle">Upload to Spotify</h2>
            <Ml image={image} />
            <CoverUploader
              image={image}
              accessToken={accessToken}
              playlist_id={playlist_id}
            />
            <Link to={`/create?access_token=${accessToken}`}>
              ← Previous
          </Link>
          </section>
        </React.Fragment>
      );
  }
}

export default Upload;
