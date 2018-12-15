export default `
precision mediump float;

uniform sampler2D u_image;
uniform float u_time;
uniform float u_warp;
uniform float u_number;
varying vec2 v_texCoord;

void main() {
  //text effect
  vec2 texCoord = vec2(v_texCoord.x, v_texCoord.y);
  texCoord.x += cos(texCoord.y * (u_warp / 10.0) + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;
  texCoord.y += sin(texCoord.x * (u_warp / 10.0) + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;

  //70s effect
  float scale = (u_number / 100.0);
  float time = u_time * 100.0;
  float r1 = 0.4 ; 
  float r2 = 0.9 ; 
  float r3 = 0.29; 
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  float h = v_texCoord.y;
  float w = v_texCoord.x;

  float col = 
    sin(distance( vec2(x * r1 + time, y * r2), vec2(w / r3 , h) ) * scale) +
    sin(distance( vec2(x, y * r2), vec2(1.0 / h * r3, w * r1) ) * scale) +
    sin(distance( vec2(r3 * x + time, r1 * y + time), vec2(w * r2 + h * r1, h * r2) ) * scale) +
    sin(distance( vec2(1.0 / x * r3 , y * r2), vec2(h, w) ) * scale);    
  
  vec3 color = vec3( 0.5 + 0.5 * sin(col), cos(col), cos(col) - sin(col));
  color += mod(gl_FragCoord.x, 2.0) < 1.0 ? 0.0 : 0.4;                                    
  
  gl_FragColor = texture2D(u_image, texCoord) + vec4(color,  1.0);
}
`;