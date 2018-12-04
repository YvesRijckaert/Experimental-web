import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Line from "../components/Line";

class Choose extends Component {
  componentDidMount() {
    this.props.changeStatusBar("40");
  }

  changeInput(e, playlistId) {
    const { value } = e.currentTarget;
    this.props.onChange(value, playlistId);
  }

  render() {
    const { playlists, accessToken } = this.props;
    return playlists === "" ? (
      <Redirect to={`/?access_token=${accessToken}`} />
    ) : (
      <React.Fragment>
        <div className="decolines">
          <Line pos="vertical" top="0" right="15" />
          <Line pos="horizontal" top="15" right="0" />
        </div>
        <section className="main choose">
          <h2 className="subtitle choose-subtitle">Choose a playlist</h2>
          <ul className="playlists">
            {playlists.map(playlist => (
              <li key={playlist.id} className="playlist-item">
                <label>
                  <input
                    name="playlist"
                    type="radio"
                    className="playlist-radiobutton"
                    value={playlist.name}
                    onChange={e => this.changeInput(e, playlist.id)}
                  />
                  <img
                    src={playlist.images[0].url}
                    className="playlist-item-image"
                    width="640"
                    height="640"
                    alt={playlist.name}
                  />
                  <p className="playlist-item-name">{playlist.name}</p>
                  <p className="playlist-item-number">
                    {playlist.tracks.total} songs
                  </p>
                </label>
              </li>
            ))}
          </ul>
          <Link to={`/genre?access_token=${accessToken}`}>
            Next →
          </Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Choose;
