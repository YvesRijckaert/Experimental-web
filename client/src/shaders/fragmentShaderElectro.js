export default `
precision mediump float;

uniform sampler2D u_image;
uniform float u_time;
uniform float u_warp;
varying vec2 v_texCoord;

void main() {
  //text effect
  vec2 texCoord = vec2(v_texCoord.x, v_texCoord.y);
  texCoord.x += cos(texCoord.y * u_warp + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;
  texCoord.y += sin(texCoord.x * u_warp + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;

  //electro
  vec3 color = 0.5 + 0.5 * cos((u_warp / 2.0) + v_texCoord.x + v_texCoord.y + vec3(0.0, 2.0, 4.0));
  
  gl_FragColor = texture2D(u_image, texCoord) + vec4(color, 1);
}
`;