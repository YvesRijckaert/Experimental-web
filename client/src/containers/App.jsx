import React, { Component, Suspense, lazy } from "react";
import queryString from "query-string";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import NoMatch from "../components/NoMatch";

const Login = lazy(() => import("../routes/Login"));
const Choose = lazy(() => import("../routes/Choose"));
const Genre = lazy(() => import("../routes/Genre"));
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
      chosenGenre: "",
      image: "",
      percentage: 0
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

  handleChosenPlaylist = (playlistName, playlistId) => {
    this.setState({
      chosenPlaylist: playlistName,
      chosenPlaylistId: playlistId
    });
  };

  handleChosenGenre = genreName => {
    console.log(genreName);
    this.setState({
      chosenGenre: genreName
    });
  };

  handleImage(image) {
    this.setState({ image: image });
  }

  handleChangeStatusBar(number) {
    this.setState({ percentage: number });
  }

  render() {
    const {
      percentage,
      accessToken,
      playlists,
      chosenPlaylist,
      chosenGenre,
      image,
      chosenPlaylistId
    } = this.state;
    return (
      <React.Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <ProgressBar percentage={percentage} />
          {accessToken ? (
            <Switch>
              <Route
                exact
                path={`/`}
                render={() => (
                  <Choose
                    accessToken={accessToken}
                    playlists={playlists}
                    onClick={(playlistName, playlistId) =>
                      this.handleChosenPlaylist(playlistName, playlistId)
                    }
                    changeStatusBar={number =>
                      this.handleChangeStatusBar(number)
                    }
                  />
                )}
              />
              <Route
                exact
                path={`/genre`}
                render={() => (
                  <Genre
                    accessToken={accessToken}
                    chosenPlaylist={chosenPlaylist}
                    onClick={genreName => this.handleChosenGenre(genreName)}
                    changeStatusBar={number =>
                      this.handleChangeStatusBar(number)
                    }
                  />
                )}
              />
              <Route
                exact
                path={`/create`}
                render={() => (
                  <Create
                    chosenGenre={chosenGenre}
                    accessToken={accessToken}
                    chosenPlaylist={chosenPlaylist}
                    chosenGenre={chosenGenre}
                    handleImage={image => this.handleImage(image)}
                    changeStatusBar={number =>
                      this.handleChangeStatusBar(number)
                    }
                  />
                )}
              />
              <Route
                exact
                path={`/upload`}
                render={() => (
                  <Upload
                    accessToken={accessToken}
                    image={image}
                    playlist_id={chosenPlaylistId}
                    changeStatusBar={number =>
                      this.handleChangeStatusBar(number)
                    }
                  />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          ) : (
            <Switch>
              <Route
                exact
                path={`/`}
                render={() => <Login onClick={e => this.handleClickLogin(e)} />}
              />
              <Route component={NoMatch} />
            </Switch>
          )}
        </Suspense>
      </React.Fragment>
    );
  }
}

export default App;
