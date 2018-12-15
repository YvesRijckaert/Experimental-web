import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Line from "../components/Line";

class Choose extends Component {
  componentDidMount() {
    this.props.changeStatusBar("20");
  }

  handleClickPlaylist(playlistName, playlistId) {
    this.props.onClick(playlistName, playlistId);
  }

  render() {
    const { playlists, accessToken } = this.props;
    return playlists === "" ? (
      <Redirect to={`/?access_token=${accessToken}`} />
    ) : (
      <React.Fragment>
        <div className="decolines">
          <Line pos="vertical" top="0" right="15" />
          <Line pos="horizontal" top="10" right="0" />
        </div>
        <section className="main choose">
          <span className="hidden"><h2 className="subtitle choose-subtitle">Choose a playlist</h2></span>
          <ul className="playlists">
            {playlists.map(playlist => (
              <li key={playlist.id} className="playlist-item">
                <Link
                  to={`/genre?access_token=${accessToken}`}
                  onClick={() =>
                    this.handleClickPlaylist(playlist.name, playlist.id)
                  }
                >
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
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </React.Fragment>
    );
  }
}

export default Choose;
