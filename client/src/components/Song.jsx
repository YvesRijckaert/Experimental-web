import React from "react";

const Song = ({title, artist, url, onClick, selectedSong}) => {
  const clickButton = e => {
    const value = e.currentTarget;
  };

  return (
    <button className="canvas-option-song" data-song={url} onClick={clickButton}>
      <span className="song-title">{title}</span>
      <span className="song-artist">{artist}</span>
    </button>
  );
};

export default Song;
