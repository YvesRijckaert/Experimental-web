import React, { Component, Suspense, lazy } from "react";
import queryString from "query-string";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";

const Login = lazy(() => import("../routes/Login"));
const Choose = lazy(() => import("../routes/Choose"));
const Create = lazy(() => import("../routes/Create"));
const Upload = lazy(() => import("../routes/Upload"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      display_name: "",
      accessToken: "",
      playlists: [],
      chosenPlaylist: "",
      chosenPlaylistId: "",
      image: ""
    };
  }
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (accessToken) {
      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + accessToken }
      })
        .then(response => response.json())
        .then(data =>
          this.setState({
            display_name: data.display_name,
            accessToken: accessToken
          })
        );

      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: "Bearer " + accessToken }
      })
        .then(response => response.json())
        .then(data =>
          this.setState({
            playlists: data.items.filter(
              playlist =>
                playlist.owner.display_name === this.state.display_name
            )
          })
        );
    }
  }

  handleClickLogin() {
    window.location = window.location.href.includes("localhost")
      ? "http://localhost:8888/login"
      : "PRODUCTION URL FOR SERVER";
  }

  handleChosenPlaylist = (e, playlistId) => {
    this.setState({ chosenPlaylist: e, chosenPlaylistId: playlistId });
  };

  handleImage(image) {
    this.setState({ image: image });
  }

  render() {
    return (
      <React.Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Switch>
            <Route
              exact
              path={`/`}
              render={() => <Login onClick={e => this.handleClickLogin(e)} />}
            />
            <Route
              exact
              path={`/choose`}
              render={() => (
                <Choose
                  accessToken={this.state.accessToken}
                  playlists={this.state.playlists}
                  onChange={(e, playlistId) =>
                    this.handleChosenPlaylist(e, playlistId)
                  }
                />
              )}
            />
            <Route
              exact
              path={`/create`}
              render={() => (
                <Create
                  accessToken={this.state.accessToken}
                  chosenPlaylist={this.state.chosenPlaylist}
                  handleImage={image => this.handleImage(image)}
                />
              )}
            />
            <Route
              exact
              path={`/upload`}
              render={() => (
                <Upload
                  accessToken={this.state.accessToken}
                  image={this.state.image}
                  playlist_id={this.state.chosenPlaylistId}
                />
              )}
            />
          </Switch>
          <ProgressBar />
        </Suspense>
      </React.Fragment>
    );
  }
}

export default App;
