export default `
#define PI	3.14159265359
#define S(t) u_warp / 5.0

precision mediump float;

uniform sampler2D u_image;
uniform float u_time;
uniform float u_warp;
uniform vec3 u_testje;
varying vec2 v_texCoord;
const float amount = .007;

float hash(in vec3 p) {
  return fract(sin(dot(p,vec3(283.6,127.1,311.7))) * 43758.5453);
}

float noise(vec3 p, vec3 fft, vec3 wav){
  p.y -= u_time * 1. + 1. * fft.x * fft.y;
  p.z += u_time * .4 - fft.z;
  p.x += 2. * cos(wav.y);
  vec3 i = floor(p);
  vec3 f = fract(p); 
  f *= f * (3.-2.*f);  
  vec2 c = vec2(0,1);
  return mix(
    mix(mix(hash(i + c.xxx), hash(i + c.yxx),f.x),
    mix(hash(i + c.xyx), hash(i + c.yyx),f.x),f.y),
    mix(mix(hash(i + c.xxy), hash(i + c.yxy),f.x),
    mix(hash(i + c.xyy), hash(i + c.yyy),f.x),f.y),
    f.z);
}

float fbm(vec3 p, vec3 fft, vec3 wav) {
  return .5000 * noise(1. * p, fft, wav) + .2500 * noise(2. * p, fft, wav) + .1250 * noise(4. * p, fft, wav) + .0625 * noise(8. * p, fft, wav);
}

void main() {
  //text effect
  vec2 texCoord = vec2(v_texCoord.x, v_texCoord.y);
  texCoord.x += cos(texCoord.y * u_warp + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;
  texCoord.y += sin(texCoord.x * u_warp + (u_time / 100.0) * (u_warp / 5.0)) / 100.0;
  
  //techno lasers
  vec3 fft = vec3(S(vec2(u_time, 1.)), S(vec2(u_time, 1.)), S(vec2(u_time, 1.)));
  float ct = cos(PI);
  float st = sin(PI);
  vec2 uv = v_texCoord.xy / v_texCoord.xy;
  vec2 vc = uv * vec2(v_texCoord.x / v_texCoord.y, .1);
  vec3 rd = normalize(vec3(.5, vc.x, vc.y));
  vec3 c = 2. * vec3(fbm(rd, fft, fft)) * vec3(u_testje);
  c *= 1.2 * smoothstep(length(uv * .25 - .0), .65, .4);

  //electro
  vec3 color = 0.5 + 0.5 * cos((u_warp / 2.0) + v_texCoord.x + v_texCoord.y + vec3(0.0, 2.0, 4.0));
  
  gl_FragColor = texture2D(u_image, texCoord) + vec4(c, 1);
}
`;