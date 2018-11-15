import React, { Component } from "react";
import queryString from "query-string";

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {}
    };
  }
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (!accessToken) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          serverData: data,
          user: data.display_name
        })
      );

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          playlists: data.items
        })
      );
  }

  render() {
    return (
      <div className="app">
        {this.state.user && this.state.playlists ? (
          <>
            <h1>Welcome, {this.state.user}</h1>
            <h2>Choose a playlist to create an artwork:</h2>
            <ul>
              {this.state.playlists.map(playlist => (
                <li key={playlist.id}>{playlist.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <button
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://better-playlists-backend.herokuapp.com/login";
            }}
          >
            Sign in with Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
