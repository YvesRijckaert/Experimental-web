import React from "react";

const Song = ({title, artist, url, onClick}) => {
  const clickButton = e => {
    const value = e.currentTarget;
    onClick(value);
  };

  return (
    <button data-song={url} onClick={clickButton}>
      <span>{title}</span>
      <span>{artist}</span>
    </button>
  );
};

export default Song;
