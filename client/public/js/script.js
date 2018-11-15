{

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let source;

  const analyser = audioCtx.createAnalyser();
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const play = document.querySelector(`.play`);
  const stop = document.querySelector(`.stop`);
  const url = `assets/audio/loyal.mp3`;

  setTimeout(() => document.body.classList.add('render'), 60);

  window.CanvasSlideshow = function (options) {

    //  SCOPE
    let that = this;

    //  OPTIONS
    options = options || {};
    options.stageWidth = options.hasOwnProperty('stageWidth') ? options.stageWidth : 1920;
    options.stageHeight = options.hasOwnProperty('stageHeight') ? options.stageHeight : 1080;
    options.pixiSprites = options.hasOwnProperty('sprites') ? options.sprites : [];
    options.centerSprites = options.hasOwnProperty('centerSprites') ? options.centerSprites : false;
    options.autoPlay = options.hasOwnProperty('autoPlay') ? options.autoPlay : true;
    options.autoPlaySpeed = options.hasOwnProperty('autoPlaySpeed') ? options.autoPlaySpeed : [10, 3];
    options.fullScreen = options.hasOwnProperty('fullScreen') ? options.fullScreen : true;
    options.displaceScale = options.hasOwnProperty('displaceScale') ? options.displaceScale : [200, 70];
    options.displacementImage = options.hasOwnProperty('displacementImage') ? options.displacementImage : '';
    options.navElement = options.hasOwnProperty('navElement') ? options.navElement : document.querySelectorAll('.scene-nav');
    options.displaceAutoFit = options.hasOwnProperty('displaceAutoFit') ? options.displaceAutoFit : false;
    options.wacky = options.hasOwnProperty('wacky') ? options.wacky : false;
    options.interactive = options.hasOwnProperty('interactive') ? options.interactive : false;
    options.interactionEvent = options.hasOwnProperty('interactionEvent') ? options.interactionEvent : '';
    options.displaceScaleTo = (options.autoPlay === false) ? [0, 0] : [20, 20];
    options.textColor = options.hasOwnProperty('textColor') ? options.textColor : '#fff';
    options.displacementCenter = options.hasOwnProperty('displacementCenter') ? options.displacementCenter : false;
    options.dispatchPointerOver = options.hasOwnProperty('dispatchPointerOver') ? options.dispatchPointerOver : false;



    //  PIXI VARIABLES
    let renderer = new PIXI.autoDetectRenderer(options.stageWidth, options.stageHeight, { transparent: true });
    let stage = new PIXI.Container();
    let slidesContainer = new PIXI.Container();
    let displacementSprite = new PIXI.Sprite.fromImage(options.displacementImage);
    let displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);


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

      // Add canvas to the HTML
      document.body.appendChild(renderer.view);

      // Add child container to the main container 
      stage.addChild(slidesContainer);

      // Enable Interactions
      stage.interactive = true;


      // Fit renderer to the screen
      if (options.fullScreen === true) {
        renderer.view.style.objectFit = 'cover';
        renderer.view.style.width = '50%';
        renderer.view.style.height = '50%';
        renderer.view.style.top = '50%';
        renderer.view.style.left = '50%';
        renderer.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)';
        renderer.view.style.transform = 'translate( -50%, -50% ) scale(1.2)';
      } else {
        renderer.view.style.maxWidth = '100%';
        renderer.view.style.top = '50%';
        renderer.view.style.left = '50%';
        renderer.view.style.webkitTransform = 'translate( -50%, -50% )';
        renderer.view.style.transform = 'translate( -50%, -50% )';
      }


      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;


      // Set the filter to stage and set some default values for the animation
      stage.filters = [displacementFilter];

      if (options.autoPlay === false) {
        displacementFilter.scale.x = 0;
        displacementFilter.scale.y = 0;
      }

      if (options.wacky === true) {

        displacementSprite.anchor.set(0.5);
        displacementSprite.x = renderer.width / 2;
        displacementSprite.y = renderer.height / 2;
      }

      displacementSprite.scale.x = 2;
      displacementSprite.scale.y = 2;

      // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
      displacementFilter.autoFit = options.displaceAutoFit;

      stage.addChild(displacementSprite);

    };

    //  LOAD SLIDES TO CANVAS
    const loadPixiSprites = (sprites) => {

      let rSprites = options.sprites;
      let rTexts = options.texts;

      for (let i = 0; i < rSprites.length; i++) {

        let texture = new PIXI.Texture.fromImage(sprites[i]);
        let image = new PIXI.Sprite(texture);
        if (rTexts) {
          let richText = new PIXI.Text(rTexts[i], style);
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

    const init = () => {

      let isRunning = true;

      initPixi();
      loadPixiSprites(options.pixiSprites);

      getData();

      //renderen image
      let render = new PIXI.ticker.Ticker();
      render.autoStart = true;
      render.add(function (delta) {
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

      if (isRunning) {
        animation();
      }

    }

    const animation = () => {

      analyser.getByteFrequencyData(dataArray);

      let scaleX = dataArray[0];

      requestAnimationFrame(animation);
      if (scaleX != 0) {
        scaleX = (scaleX - 90)
        TweenMax.to(displacementFilter.scale, 1, { x: "+=" + Math.sin(scaleX) * 100 + "", y: "+=" + Math.cos(scaleX) * 50 + "" });
      }
    }

    init();
  };
}; 