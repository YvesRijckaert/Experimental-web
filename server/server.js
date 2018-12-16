const express = require("express");
const request = require("request");
const querystring = require("querystring");

const app = express();

const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:8888/callback";

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "user-read-private playlist-modify-private playlist-read-private ugc-image-upload",
        redirect_uri
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token;
    const uri = "http://localhost:3000";
    res.redirect(uri + "?access_token=" + access_token);
  });
});

const port = process.env.PORT || 8888;
app.listen(port);
