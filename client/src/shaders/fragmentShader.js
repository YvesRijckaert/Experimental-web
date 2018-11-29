export default `
precision mediump float;

uniform sampler2D u_image;
uniform float u_time;
uniform float u_warp;
varying vec2 v_texCoord;
const float amount = .007;

void main() {
  vec2 texCoord = vec2(v_texCoord.x, v_texCoord.y);
  texCoord.x += cos(texCoord.y * u_warp + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;
  texCoord.y += sin(texCoord.x * u_warp + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;
  float s = abs(sin(u_time * u_warp)) * amount;
  gl_FragColor =  texture2D(u_image, texCoord);
}
`;