export function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
  let program = gl.createProgram();
  let vertexShader = createShader.call(this, ...[
    gl,
    gl.VERTEX_SHADER,
    decodeURIComponent(vertexShaderSource)
  ]);

  let fragmentShader = createShader.call(this, ...[
    gl,
    gl.FRAGMENT_SHADER,
    decodeURIComponent(fragmentShaderSource)
  ]);

  [vertexShader, fragmentShader]
    .forEach(gl.attachShader.bind(gl, program));

  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  } else {
    let message = gl.getProgramInfoLog(program);

    gl.deleteProgram(program);

    throw new Error(message);
  }
}

export function createShader(gl, type, source) {
  let shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  } else {
    let message = gl.getShaderInfoLog(shader);

    gl.deleteShader(shader);

    throw new Error(message);
  }
}
