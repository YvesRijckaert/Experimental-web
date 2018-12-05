import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import genres from "../data/genres.js";

import Line from "../components/Line";

class Genre extends Component {
  componentDidMount() {
    this.props.changeStatusBar("60");
  }

  render() {
    const { chosenPlaylist, accessToken } = this.props;
    return chosenPlaylist === "" ? (
      <Redirect to={`/?access_token=${accessToken}`} />
    ) : (
      <React.Fragment>
        <div className="decolines">
          <Line pos="horizontal" top="15" right="0" />
          <Line pos="horizontal" top="30" right="15" />
          <Line pos="vertical" top="30" right="15" />
        </div>
        <section className="main genre">
          <h2 className="subtitle">Choose a genre</h2>
          <ul>
            {genres.map(genre => (
              <li key={genre.name}>{genre.name}</li>
            ))}
          </ul>
          <Link to={`/?access_token=${accessToken}`}>
            ← Previous
          </Link>
          <Link to={`/create?access_token=${accessToken}`}>
          Next →
        </Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Genre;
