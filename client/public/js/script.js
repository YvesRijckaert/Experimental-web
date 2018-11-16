{
  const $canvas = document.querySelector(`#c`),
        gl = $canvas.getContext(`webgl`);

  const init = () => {
    if (!gl) {
      //no webgl support
      return;
    }
    const program = createProgram(gl, `vertex-shader`, `fragment-shader`);
    if (!program) {
      return;
    }
    fetchImage(`../assets/img/test.jpg`)
      .then(img => initProgram(program, img));
  };

  const initProgram = (program, image) => {
    image.width /= 3;
    image.height /= 3;
    $canvas.width = image.width;
    $canvas.height = image.height;

    gl.useProgram(program);
    const texCoordAttribute = gl.getAttribLocation(program, 'a_texCoord');
    const texCoordBuffer = gl.createBuffer();
    const texCoords = new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,

      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    const positionAttribute = gl.getAttribLocation(program, `a_position`);
    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([
      0,            0,
      image.width,  0,
      0,            image.height,

      0,            image.height,
      image.width,  image.height,
      image.width,  0
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const matrixUniform = gl.getUniformLocation(program, `u_matrix`);
    const projectionMatrix = m3.projection($canvas.width, $canvas.height);

    const timeUniform = gl.getUniformLocation(program, `u_time`);

    const fps = 60, 
          frameDuration = 1000 / fps; 
    let time = 0,
        lastTime = 0;

    const draw = elapsed => {
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
  };

  const fetchImage = url => {
    return new Promise(resolve => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.src = url;
    });
  };

  const createProgram = (gl, vertexId, fragmentId) => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexId);
    if (!vertexShader) {
      return;
    }
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentId);
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
  };

  const createShader = (gl, type, id) => {
    const source = document.getElementById(id).text;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return false;
  };

  init();
}