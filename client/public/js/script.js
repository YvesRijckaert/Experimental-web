{
  const inputImg = document.getElementById("inputImg"); // The image we want to transfer
  const styleA = document.getElementById("styleA"); // The div contrianer that holds new style image A

  const init = () => {
    ml5
      .styleTransfer("../assets/models/techno")
      .then(style1 => style1.transfer(inputImg))
      .then(result => {
        const newImage1 = new Image(250, 250);
        newImage1.src = result.src;
        styleA.appendChild(newImage1);
      });
  };

  init();
}
