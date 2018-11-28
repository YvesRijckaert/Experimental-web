import React, { Component, Suspense, lazy } from "react";
import queryString from "query-string";
import { Route, Switch } from "react-router-dom";

import { UserProvider } from "../context/UserContext";

const StepOne = lazy(() => import("../routes/StepOne"));
const StepTwo = lazy(() => import("../routes/StepTwo"));
const StepThree = lazy(() => import("../routes/StepThree"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      user: {},
      playlists: [],
      genre: ""
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
            serverData: data,
            user: {
              accessToken: accessToken,
              userName: data.display_name
            }
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
                playlist.owner.display_name === this.state.user.userName
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

  handleInputChange = e => {
    this.setState({ genre: e });
  };

  render() {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProvider value={this.state.user}>
            {this.state.user.userName ? (
              <Switch>
                <Route
                  exact
                  path={`/`}
                  render={() => (
                    <StepOne
                      playlists={this.state.playlists}
                      onChange={e => this.handleInputChange(e)}
                    />
                  )}
                />
                <Route exact path={`/stepTwo`} render={() => <StepTwo />} />
                <Route exact path={`/stepThree`} render={() => <StepThree />} />
              </Switch>
            ) : (
              <button onClick={() => this.handleClickLogin()}>
                Sign in with Spotify
              </button>
            )}
          </UserProvider>
        </Suspense>
      </>
    );
  }
}

export default App;
