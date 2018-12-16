import React from "react";

const CoverUploader = ({ playlist_id, image, accessToken }) => {
  const handleUpload = () => {
    const machineImage = image.machineImage.getAttribute("src");
    if (image !== null) {
      fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/images`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "image/jpeg"
        },
        body: machineImage.replace(/^data:image\/[a-z]+;base64,/, "")
      })
        .then(response => console.log(response))
        .catch(error => console.error("Error:", error));
    }
  };


  return image.machineImage !== "" ? (
    <button className="upload-button" onClick={() => handleUpload()}>
      Upload to spotify
    </button>
  ) : (
    <p className="upload-info">* We create a unique image using machine learning.</p>
  );
};

export default CoverUploader;
