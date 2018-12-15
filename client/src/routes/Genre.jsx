import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Star from "../components/Star";

import genres from "../data/genres.js";

import Line from "../components/Line";

class Genre extends Component {
  componentDidMount() {
    this.props.changeStatusBar("40");
  }

  handleClickGenre(genreName) {
    this.props.onClick(genreName);
  }

  render() {
    const { chosenPlaylist, accessToken } = this.props;
    return chosenPlaylist === "" ? (
      <Redirect to={`/?access_token=${accessToken}`} />
    ) : (
        <React.Fragment>
          <section className="main genre">
            <h2 className="subtitle">Choose a genre</h2>
            <ul className="genre-list">
              {genres.map(genre => (
                <li className="genre-item" key={genre.name}>
                  <Link
                    to={`/create?access_token=${accessToken}`}
                    onClick={() =>
                      this.handleClickGenre(genre.name)
                    }
                  >
                    <p>{genre.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Star className="star" />
            <Link to={`/?access_token=${accessToken}`}>← Previous</Link>
          </section>
        </React.Fragment>
      );
  }
}

export default Genre;
