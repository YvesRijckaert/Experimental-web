import React from "react";

const CoverUploader = ({ playlist_id, image, accessToken }) => {
  console.log(playlist_id, image, accessToken);
  const handleUpload = () => {
    fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/images`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "image/jpeg"
      },
      body: image.replace(/^data:image\/[a-z]+;base64,/, "")
    }).then(response => console.log(response));
  };

  return <button onClick={() => handleUpload()}>Upload to spotify</button>;
};

export default CoverUploader;
