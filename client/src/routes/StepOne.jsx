import React from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../context/UserContext";

const StepOne = ({ playlists, onChange }) => {
  
  const changeInput = e => {
    const { value } = e.currentTarget;
    onChange(value);
  };

  return (
    <UserConsumer>
      {context => {
        return (
          <section className="step stepOne">
            <h1 className="step-title">Welcome {context.userName}</h1>
            <h2 className="step-subtitle">
              Step01: Choose one of your playlists to create the artwork:
            </h2>
            <ul className="playlists">
              {playlists.map(playlist => (
                <li key={playlist.id} className="playlists-item">
                  <label>
                    <p className="playlists-item-name">{playlist.name}</p>
                    <input
                      name="playlist"
                      type="radio"
                      className="playlist-radiobutton"
                      value={playlist.name}
                      onChange={changeInput}
                    />
                    <img
                      src={playlist.images[0].url}
                      className="playlists-item-image"
                      width="640"
                      height="640"
                      alt={playlist.name}
                    />
                  </label>
                </li>
              ))}
            </ul>
            <Link to={`/stepTwo?access_token=${context.accessToken}`}>
              Next
            </Link>
          </section>
        );
      }}
    </UserConsumer>
  );
};

export default StepOne;
