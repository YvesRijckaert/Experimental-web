import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Star from "../components/Star";

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
            <Line pos="horizontal" top="28" right="10" />
            <Line pos="vertical" top="28" right="10" />
          </div>
          <section className="main genre">
            <h2 className="subtitle">Choose a genre</h2>
            <ul className="genre-list">
              {genres.map(genre => (
                <li className="genre-item" key={genre.name}><p>{genre.name}</p></li>
              ))}
            </ul>
            <Star className="star" />
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
