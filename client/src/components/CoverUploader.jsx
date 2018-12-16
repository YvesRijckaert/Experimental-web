import React from "react";

const CoverUploader = ({ playlist_id, image, accessToken }) => {
  const handleUpload = () => {
    console.log(playlist_id, image, accessToken);
    if (image !== null) {
      fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/images`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "image/jpeg"
        },
        body: image.machineImage.src.replace(/^data:image\/[a-z]+;base64,/, "")
      })
        .then(response => console.log(response))
        .catch(error => console.error("Error:", error));
    }
  };

  return <button onClick={() => handleUpload()}>Upload to spotify</button>;
};

export default CoverUploader;
