{
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let source;

  const analyser = audioCtx.createAnalyser();
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const play = document.querySelector(`.play`);
  const stop = document.querySelector(`.stop`);
  const url = `assets/audio/loyal.mp3`;

  const spriteImages = document.querySelectorAll(".slide-item__image");
  let spriteImagesSrc = [];
  const options = {
    stageWidth: 1920,
    stageHeight: 1080,
    pixiSprites: [],
    texts: [],
    sprites: spriteImagesSrc,
    centerSprites: false,
    autoPlay: true,
    autoPlaySpeed: [10, 3],
    displaceScale: [200, 70],
    displacementImage: "./assets/img/dmaps/2048x2048/clouds.jpg",
    navElement: document.querySelectorAll(".scene-nav"),
    displaceAutoFit: false,
    wacky: false,
    interactive: false,
    interactionEvent: "",
    displaceScaleTo: [20, 20],
    textColor: "#fff",
    displacementCenter: false,
    dispatchPointerOver: false
  };

  let renderer = new PIXI.autoDetectRenderer(
    options.stageWidth,
    options.stageHeight,
    { transparent: true }
  );
  let stage = new PIXI.Container();
  let slidesContainer = new PIXI.Container();
  let displacementSprite = new PIXI.Sprite.fromImage(options.displacementImage);
  let displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  );

  const getData = () => {
    source = audioCtx.createBufferSource();
    source.connect(analyser);
    fetch(url)
      .then(response => {
        return response.arrayBuffer();
      })
      .then(buffer => {
        audioCtx.decodeAudioData(buffer, decodedData => {
          source.buffer = decodedData;
          source.connect(audioCtx.destination);
        });
      });
  };

  //  INITIALISE PIXI
  const initPixi = () => {
    document.body.appendChild(renderer.view);
    stage.addChild(slidesContainer);
    stage.interactive = true;
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    stage.filters = [displacementFilter];
    displacementSprite.scale.x = 2;
    displacementSprite.scale.y = 2;
    displacementFilter.autoFit = options.displaceAutoFit;
    stage.addChild(displacementSprite);
  };

  const loadPixiSprites = () => {
    let rSprites = options.sprites;
    let rTexts = options.texts;

    for (let i = 0; i < rSprites.length; i++) {
      let texture = new PIXI.Texture.fromImage(options.sprites[i]);
      let image = new PIXI.Sprite(texture);
      if (rTexts) {
        let richText = new PIXI.Text(rTexts[i], options.style);
        image.addChild(richText);

        richText.anchor.set(0.5);
        richText.x = image.width / 2;
        richText.y = image.height / 2;
      }
      if (options.centerSprites === true) {
        image.anchor.set(0.5);
        image.x = renderer.width / 2;
        image.y = renderer.height / 2;
      }
      if (i !== 0) {
        TweenMax.set(image, { alpha: 0 });
      }
      slidesContainer.addChild(image);
    }
  };

  const animation = () => {
    analyser.getByteFrequencyData(dataArray);
    let scaleX = dataArray[0];
    requestAnimationFrame(animation);
    if (scaleX != 0) {
      scaleX = scaleX - 90;
      TweenMax.to(displacementFilter.scale, 1, {
        x: "+=" + Math.sin(scaleX) * 100 + "",
        y: "+=" + Math.cos(scaleX) * 50 + ""
      });
    }
  };

  const init = () => {
    spriteImages.forEach(spriteImage => {
      spriteImagesSrc.push(spriteImage.getAttribute("src"));
    });

    initPixi();
    loadPixiSprites();
    getData();

    //renderen image
    let render = new PIXI.ticker.Ticker();
    render.autoStart = true;
    render.add(function(delta) {
      renderer.render(stage);
    });

    //buttons
    play.onclick = () => {
      source.start(0);
      play.disabled = true;
      isRunning = true;
    };

    stop.onclick = () => {
      source.stop(0);
      play.disabled = false;
      isRunning = false;
    };

    animation();
  };
  init();
}
