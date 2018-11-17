export default `
attribute vec2 a_texCoord;
attribute vec2 a_position;
uniform mat3 u_matrix;
varying vec2 v_texCoord;
void main() {
  vec2 location = (u_matrix * vec3(a_position, 1)).xy;
  gl_Position = vec4(location, 0, 1);
  v_texCoord = a_texCoord;
}
`;