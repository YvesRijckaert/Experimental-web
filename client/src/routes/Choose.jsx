import React from "react";
import { Link } from "react-router-dom";

const Choose = ({ accessToken, playlists, onChange }) => {
  const changeInput = (e, playlistId) => {
    const { value } = e.currentTarget;
    onChange(value, playlistId);
  };

  return (
    <section className="choose">
      <h2>Choose a playlist</h2>
      <ul className="playlists">
        {playlists.map(playlist => (
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
                onChange={(e) => changeInput(e, playlist.id)}
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
      <Link to={`/create?access_token=${accessToken}`}>Next →</Link>
    </section>
  );
};

export default Choose;
