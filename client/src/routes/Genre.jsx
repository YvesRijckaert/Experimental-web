import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Line from "../components/Line";

class Genre extends Component {
  componentDidMount() {
    this.props.changeStatusBar("60");
  }
  render() {
    return this.props.chosenPlaylist === "" ? (
      <Redirect to={`/?access_token=${this.props.accessToken}`} />
    ) : (
      <React.Fragment>
        <div className="decolines">
          <Line pos="horizontal" top="15" right="0" />
          <Line pos="horizontal" top="85" right="15" />
          <Line pos="vertical" top="-15" right="15" />
        </div>
        <section className="main genre">
          <h2 className="subtitle">Choose a genre</h2>
          <Link to={`/?access_token=${this.props.accessToken}`}>
            ← Previous
          </Link>
          <Link to={`/create?access_token=${this.props.accessToken}`}>
          Next →
        </Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Genre;
