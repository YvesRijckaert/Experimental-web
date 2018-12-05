# Experimental Web
## Spotify playlist artwork creator

Assignment for Experimental Web (Devine) 2018/2019.

### Installing

1.  Front-end

→ Runs on port 3000

```
$ cd ./client
$ yarn && yarn start
```

2.  Back-end (server)

→ Runs on port 8888<br /><br />
You need to insert terminal variables for the Spotify Client ID and Spotify Client Secret of the application to access the secured database.

```
$ cd ./server
$ export SPOTIFY_CLIENT_ID=XXXX
$ export SPOTIFY_CLIENT_SECRET=YYYY
$ yarn && yarn start
```