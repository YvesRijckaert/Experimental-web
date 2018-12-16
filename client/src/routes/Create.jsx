import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import songs from "../data/songs.js";

import Line from "../components/Line.jsx";
import CanvasTechno from "../components/CanvasTechno.jsx";
import Canvas70s from "../components/Canvas70s.jsx";
import Song from "../components/Song.jsx";
import PauseCanvas from "../components/PauseCanvas.jsx";
import NextLink from "../components/NextLink.jsx";

class Create extends Component {
  constructor(props) {
    super(props);
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.state = {
      audio: {
        pause: false,
        audioCtx: audioCtx,
        source: "",
        analyser: "",
        bufferLength: "",
        dataArray: ""
      },
      selectedSong: ""
    };
  }

  componentDidMount() {
    if (this.props.chosenPlaylist) {
      this.props.changeStatusBar("60");
      const startingSong = songs.filter(
        song => song.genre === this.props.chosenGenre.toLowerCase()
      )[0].url;
      this.playSong(`../assets/audio/${startingSong}.mp3`);
      this.setState({
        selectedSong: startingSong
      });
    }
  }

  componentDidUpdate() {
    window.onpopstate = e => {
      this.state.audio.source.stop(0);
    };
  }

  playSong(url) {
    const { audioCtx } = this.state.audio;
    const source = audioCtx.createBufferSource();
    const analyser = audioCtx.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.setState({
      audio: {
        ...this.state.audio,
        source: source,
        analyser: analyser,
        bufferLength: bufferLength,
        dataArray: dataArray
      }
    });
    source.connect(analyser);
    fetch(url)
      .then(response => {
        return response.arrayBuffer();
      })
      .then(buffer => {
        audioCtx.decodeAudioData(buffer, decodedData => {
          source.buffer = decodedData;
          source.connect(audioCtx.destination);
        });
      })
      .then(source.start(0));
  }

  handleClickSong(value) {
    this.setState({
      selectedSong: value.dataset.song
    });
    this.state.audio.source.stop(0);
    const url = `../assets/audio/${value.dataset.song}.mp3`;
    this.playSong(url);
  }

  handleClickPause(value) {
    const state = value.dataset.info;
    if (state === "pause") {
      this.state.audio.source.stop(0);
      this.setState({
        audio: {
          ...this.state.audio,
          pause: true
        }
      });
    }

    if (state === "play") {
      this.playSong(`../assets/audio/${this.state.selectedSong}.mp3`);
      this.setState({
        audio: {
          ...this.state.audio,
          pause: false
        }
      });
    }
  }

  renderCanvas(chosenGenre, chosenPlaylist, accessToken, handleImage, audio) {
    switch (chosenGenre) {
      case "Techno":
        return (
          <CanvasTechno
            chosenPlaylist={chosenPlaylist}
            audio={audio}
            passImage={image => handleImage(image)}
          />
        );
      case "70s":
        return (
          <Canvas70s
            chosenPlaylist={chosenPlaylist}
            audio={audio}
            passImage={image => handleImage(image)}
          />
        );
      default:
        return <Redirect to={`/?access_token=${accessToken}`} />;
    }
  }

  render() {
    const {
      chosenPlaylist,
      chosenGenre,
      accessToken,
      handleImage
    } = this.props;
    const { audio, selectedSong } = this.state;
    return chosenPlaylist === "" || chosenGenre === "" ? (
      <Redirect to={`/?access_token=${accessToken}`} />
    ) : (
      <React.Fragment>
        <Link
          onClick={() => audio.source.stop(0)}
          className="back"
          to={`/genre?access_token=${accessToken}`}
        >
          Back
        </Link>
        <div className="decolines">
          <Line pos="vertical" top="20" right="50" />
          <Line pos="horizontal" top="85" right="0" />
        </div>
        <section className="main create">
          <h2 className="subtitle hidden">Create a cover</h2>
          {this.renderCanvas(
            chosenGenre,
            chosenPlaylist,
            accessToken,
            handleImage,
            audio
          )}
          <div
            className={
              audio.pause === true
                ? "canvas-options-songs canvas-options-songs-disabled"
                : "canvas-options-songs"
            }
          >
            <h3 className="canvas-option-title">Sound</h3>
            {songs
              .filter(song => song.genre === chosenGenre.toLowerCase())
              .map(song => (
                <Song
                  key={song.url}
                  title={song.title}
                  artist={song.artist}
                  url={song.url}
                  onClick={value => this.handleClickSong(value)}
                  selectedSong={selectedSong}
                />
              ))}
          </div>
          <PauseCanvas
            paused={audio.pause}
            onClick={value => this.handleClickPause(value)}
          />
          <NextLink
            url="upload"
            accessToken={accessToken}
            active={audio.pause}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default Create;
