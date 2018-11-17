import React, { Component, Suspense, lazy } from "react";
import queryString from "query-string";
import { Route, Switch } from "react-router-dom";

import { UserProvider } from "../context/UserContext";

const Step01 = lazy(() => import("../routes/Step01"));
const Step02 = lazy(() => import("../routes/Step02"));
const Step03 = lazy(() => import("../routes/Step03"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      user: {},
      playlists: []
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
              playlist => playlist.owner.display_name === this.state.user
            )
          })
        );
    }
  }

  render() {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProvider value={this.state.user}>
            <Switch>
              {this.state.user.userName ? (
                <>
                  <Route exact path={`/`} component={Step01} />
                  <Route exact path={`/step02`} component={Step02} />
                  <Route exact path={`/step03`} component={Step03} />
                </>
              ) : (
                <button
                  onClick={() => {
                    window.location = window.location.href.includes("localhost")
                      ? "http://localhost:8888/login"
                      : "PRODUCTION URL FOR SERVER";
                  }}
                >
                  Sign in with Spotify
                </button>
              )}
            </Switch>
          </UserProvider>
        </Suspense>
      </>
    );
  }
}

export default App;
