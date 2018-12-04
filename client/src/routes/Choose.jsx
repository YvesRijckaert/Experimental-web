import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Line from "../components/Line";

class Choose extends Component {
  componentDidMount() {
    this.props.changeStatusBar("50");
  }

  changeInput(e, playlistId) {
    const { value } = e.currentTarget;
    this.props.onChange(value, playlistId);
  }

  render() {
    return this.props.playlists === "" ? (
      <Redirect to={`/?access_token=${this.props.accessToken}`} />
    ) : (
      <React.Fragment>
        <div className="decolines">
          <Line pos="vertical" top="0" right="15" />
          <Line pos="horizontal" top="15" right="0" />
        </div>
        <section className="choose">
          <h2 className="subtitle">Choose a playlist</h2>
          <ul className="playlists">
            {this.props.playlists.map(playlist => (
              <li key={playlist.id} className="playlist-item">
                <label>
                  <p className="playlist-item-name">{playlist.name}</p>
                  <p className="playlist-item-name">
                    {playlist.tracks.total} songs
                  </p>
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
                </label>
              </li>
            ))}
          </ul>
          <Link to={`/create?access_token=${this.props.accessToken}`}>
            Next →
          </Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Choose;
