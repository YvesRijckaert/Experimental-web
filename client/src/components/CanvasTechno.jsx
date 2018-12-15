import React, { Component } from "react";
import { projection } from "../utils/utils";
import fragmentShaderTechno from "../shaders/fragmentShaderTechno";
import vertexShaderSource from "../shaders/vertexShader";
import StyleHandlersTechno from "./StyleHandlersTechno";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas2D = React.createRef();
    this.canvasWebGL = React.createRef();
    this.state = {
      canvas: {
        background: "#000",
        textColour: "#fff",
        technoLaser: [5.0, 0.0, 0.0]
      },
      selectedColor: 'red',
    };
  }

  componentDidMount() {
    this.initCanvas2D();
    this.initCanvasWebGL();
  }

  initCanvas2D() {
    const $canvas2D = this.canvas2D.current;
    const ctx = $canvas2D.getContext(`2d`);
    const textToWrite = this.props.chosenPlaylist.toUpperCase();
    const textSize = 400;
    ctx.font = textSize + "px druktext";
    $canvas2D.width = ctx.measureText(textToWrite).width + 100;
    $canvas2D.height = 4 * textSize;
    ctx.fillStyle = this.state.canvas.background;
    ctx.fillRect(0, 0, $canvas2D.width, $canvas2D.height);
    ctx.fillStyle = this.state.canvas.textColour;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = textSize + "px druktext";
    ctx.fillText(textToWrite, $canvas2D.width / 2, $canvas2D.height / 2);
  }

  initCanvasWebGL() {
    const $canvasWebGL = this.canvasWebGL.current;
    const gl = $canvasWebGL.getContext(`webgl`, {
      preserveDrawingBuffer: true,
      antialias: true
    });
    const program = this.createProgram(gl, `vertex`, `fragment`);
    this.initProgram(program, gl, $canvasWebGL);
  }

  initProgram(program, gl, canvas) {
    canvas.width = 400;
    canvas.height = 400;

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
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.canvas2D.current
    );

    const positionAttribute = gl.getAttribLocation(program, `a_position`);
    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([
      0,
      0,
      canvas.width,
      0,
      0,
      canvas.height,
      0,
      canvas.height,
      canvas.width,
      canvas.height,
      canvas.width,
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
      this.props.audio.analyser.getByteFrequencyData(
        this.props.audio.dataArray
      );
      gl.uniform1f(warpUniform, this.props.audio.dataArray[0] / 10);
      let delta = elapsed - lastTime;
      lastTime = elapsed;
      let step = delta / frameDuration;
      time += step;
      gl.useProgram(program);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniformMatrix3fv(matrixUniform, false, projectionMatrix);
      gl.uniform1f(timeUniform, time * 0.001);
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordAttribute);
      gl.vertexAttribPointer(texCoordAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionAttribute);
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      //laser lichten kleuren (rood groen blauw)
      const laserColourUniform = gl.getUniformLocation(program, `u_laserColour`);
      gl.uniform3f(
        laserColourUniform,
        this.state.canvas.technoLaser[0],
        this.state.canvas.technoLaser[1],
        this.state.canvas.technoLaser[2]
      );
      //pause (take picture)
      if (this.props.audio.pause) {
        cancelAnimationFrame(draw);
        this.props.passImage(
          this.canvasWebGL.current.toDataURL("image/jpeg", 1.0)
        );
      } else {
        requestAnimationFrame(draw);
      }
    };
    if (this.props.audio.pause) {
      cancelAnimationFrame(draw);
    } else {
      requestAnimationFrame(draw);
    }
  }

  createProgram(gl, vertexId, fragmentId) {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexId);
    const fragmentShader = this.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentId
    );
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
      id === "vertex" ? vertexShaderSource : fragmentShaderTechno
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

  handleChangeLaser(colour) {
    const coloursRgbArray = JSON.parse("[" + colour.dataset.rgb + "]");
    this.setState({
      canvas: {
        ...this.state.canvas,
        technoLaser: coloursRgbArray
      },
      selectedColor: colour.dataset.colour
    });
  }

  render() {
    return (
      <React.Fragment>
        <canvas ref={this.canvas2D} className="canvas2d" />
        <canvas ref={this.canvasWebGL} className="canvasWebGL" />
        <StyleHandlersTechno onClick={colour => this.handleChangeLaser(colour)} selectedColor={this.state.selectedColor} />
      </React.Fragment>
    );
  }
}

export default Canvas;
