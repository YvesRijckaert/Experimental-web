{
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let source;

  const analyser = audioCtx.createAnalyser();
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const play = document.querySelector(`.play`);
  const stop = document.querySelector(`.stop`);
  const url = `assets/audio/loyal.mp3`;

  let camera, scene, renderer;
  let geometry, material, mesh;
  let cubes;

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

  const animate = () => {
    requestAnimationFrame(animate);

    analyser.getByteFrequencyData(dataArray);
    console.log(dataArray);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    const scale = dataArray[0] / 30;
    mesh.scale.z = scale < 1 ? 1 : scale;

    renderer.render(scene, camera);
  };

  const createScene = () => {
    camera = new THREE.PerspectiveCamera(70, 500 / 500, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(500, 500);
    document.body.appendChild(renderer.domElement);

    animate();
  };

  const init = () => {
    getData();

    play.onclick = () => {
      getData();
      source.start(0);
      play.disabled = true;
    };

    stop.onclick = () => {
      source.stop(0);
      play.disabled = false;
    };

    createScene();
  };
  init();
}
