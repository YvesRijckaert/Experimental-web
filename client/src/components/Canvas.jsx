import React, { Component } from "react";
import { projection } from "../utils";
import fragmentShaderSource from "../shaders/fragmentShader";
import vertexShaderSource from "../shaders/vertexShader";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasWebGL = React.createRef();
    this.playButton = React.createRef();
    this.stopButton = React.createRef();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createBufferSource();
    const analyser = audioCtx.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const url = `../assets/audio/techno.mp3`;
    this.getAudioData(audioCtx, source, analyser, bufferLength, dataArray, url);
    this.state = {
      audio: {
        audioCtx: audioCtx,
        source: source,
        analyser: analyser,
        bufferLength: bufferLength,
        dataArray: dataArray,
        url: url
      }
    };
  }

  componentDidMount() {
    const $canvas = this.canvasWebGL.current;
    const gl = $canvas.getContext(`webgl`);
    if (!gl) {
      alert("webgl support necessary for this site!");
    }
    const program = this.createProgram(gl, `vertex`, `fragment`);
    this.fetchImage(`../assets/img/test.jpg`).then(img =>
      this.initProgram(program, img, gl, $canvas)
    );
  }

  initProgram(program, image, gl, canvas) {
    image.width /= 3;
    image.height /= 3;
    canvas.width = image.width;
    canvas.height = image.height;

    gl.useProgram(program);
    const texCoordAttribute = gl.getAttribLocation(program, "a_texCoord");
    const texCoordBuffer = gl.createBuffer();
    const texCoords = new Float32Array([
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      1.0,

      0.0,
      1.0,
      1.0,
      1.0,
      1.0,
      0.0
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    const positionAttribute = gl.getAttribLocation(program, `a_position`);
    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([
      0,
      0,
      image.width,
      0,
      0,
      image.height,

      0,
      image.height,
      image.width,
      image.height,
      image.width,
      0
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const matrixUniform = gl.getUniformLocation(program, `u_matrix`);
    const projectionMatrix = projection(canvas.width, canvas.height);

    const timeUniform = gl.getUniformLocation(program, `u_time`);

    const fps = 60,
      frameDuration = 1000 / fps;
    let time = 0,
      lastTime = 0;

    const warpUniform = gl.getUniformLocation(program, `u_warp`);

    const draw = elapsed => {
      //sound analyser
      this.state.audio.analyser.getByteFrequencyData(
        this.state.audio.dataArray
      );
      gl.uniform1f(warpUniform, this.state.audio.dataArray[0] / 10);

      let delta = elapsed - lastTime;
      lastTime = elapsed;
      let step = delta / frameDuration;
      time += step;

      gl.useProgram(program);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniformMatrix3fv(matrixUniform, false, projectionMatrix);
      gl.uniform1f(timeUniform, time);

      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordAttribute);
      gl.vertexAttribPointer(texCoordAttribute, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionAttribute);
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }

  createProgram(gl, vertexId, fragmentId) {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexId);
    if (!vertexShader) {
      return;
    }
    const fragmentShader = this.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentId
    );
    if (!fragmentShader) {
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return false;
  }

  createShader(gl, type, id) {
    const shader = gl.createShader(type);
    gl.shaderSource(
      shader,
      id === "vertex" ? vertexShaderSource : fragmentShaderSource
    );
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return false;
  }

  fetchImage(url) {
    return new Promise(resolve => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.src = url;
    });
  }

  getAudioData(audioCtx, source, analyser, bufferLength, dataArray, url) {
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
        this.setState({
          audio: {
            ...this.state.audio,
            source: source
          }
        });
      });
  }

  handleClickPlay() {
    //this.getAudioData(); //bug with second play
    this.state.audio.source.start(0);
    this.playButton.current.disabled = true;
  }

  handleClickStop() {
    this.state.audio.source.stop(0);
    this.playButton.current.disabled = false;
  }

  render() {
    return (
      <>
        <button
          ref={this.playButton}
          onClick={() => this.handleClickPlay()}
          className="play"
        >
          Play
        </button>
        <button
          ref={this.stopButton}
          onClick={() => this.handleClickStop()}
          className="stop"
        >
          Stop
        </button>
        <canvas ref={this.canvasWebGL} />
      </>
    );
  }
}

export default Canvas;
