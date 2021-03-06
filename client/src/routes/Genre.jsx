import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import genres from "../data/genres.js";

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
           <Link className="back" to={`/?access_token=${accessToken}`}>
            Back
          </Link>
          <section className="main genre">
            <h2 className="hidden">Choose a genre</h2>
            <ul className="genre-list">
              {genres.map(genre => genre.available === false ? (
                <li className="genre-item" key={genre.name}>
                    <p>{genre.name}</p>
                    <p className="genre-info">coming later</p>
                </li>
              ):(<Link
                to={`/create?access_token=${accessToken}`}
                key={genre.name}
                onClick={() =>
                  this.handleClickGenre(genre.name)
                }
              ><li className="genre-item available" key={genre.name}>
              
                <p>{genre.name}</p>
              
            </li></Link>))}
            </ul>
          </section>
        </React.Fragment>
      );
  }
}

export default Genre;
