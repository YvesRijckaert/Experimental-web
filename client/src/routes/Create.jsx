import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import songs from "../data/songs.js";

import Line from "../components/Line.jsx";
import CanvasTechno from "../components/CanvasTechno.jsx";
import CanvasJazz from "../components/CanvasJazz.jsx";
import Song from "../components/Song.jsx";
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
      }
    };
  }

  componentDidMount() {
    this.props.changeStatusBar("60");
    if (this.props.chosenPlaylist) {
      this.playSong(`../assets/audio/voicesoftheancient.mp3`);
    }
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
    this.state.audio.source.stop(0);
    const url = `../assets/audio/${value.dataset.song}.mp3`;
    this.playSong(url);
  }

  handleClickPause() {
    this.state.audio.source.stop(0);
    this.setState({
      audio: {
        ...this.state.audio,
        pause: true
      }
    });
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
      case "Jazz":
        return (
          <CanvasJazz
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
    const { audio } = this.state;
    return chosenPlaylist === "" || chosenGenre === "" ? (
      <Redirect to={`/?access_token=${accessToken}`} />
    ) : (
      <React.Fragment>
        <div className="decolines">
          <Line pos="horizontal" top="10" right="0" />
          <Line pos="horizontal" top="40" right="-15" />
          <Line pos="vertical" top="40" right="85" />
        </div>
        <section className="main create">
          <h2 className="subtitle">Create a cover</h2>
          {this.renderCanvas(chosenGenre, chosenPlaylist, accessToken, handleImage, audio)}
          {songs
            .filter(song => song.genre === "techno")
            .map(song => (
              <Song
                key={song.url}
                title={song.title}
                artist={song.artist}
                url={song.url}
                onClick={value => this.handleClickSong(value)}
              />
            ))}
          <button onClick={() => this.handleClickPause()}>Pause</button>
          <Link
            onClick={() => audio.source.stop(0)}
            to={`/genre?access_token=${accessToken}`}
          >
            ← Previous
          </Link>
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
