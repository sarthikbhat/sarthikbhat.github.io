import { NOISE } from './common'

export const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uMode;
uniform float uIntensity;
uniform vec2 uPointer;
uniform vec3 uPaper;
uniform vec3 uInk;
uniform vec3 uA1;
uniform vec3 uA2;
uniform vec3 uA3;
${NOISE}

float aspect(){ return uRes.x / uRes.y; }

float flow(vec2 p, float t){
  vec2 q = vec2(fbm(p + t*0.06), fbm(p + vec2(5.2,1.3) - t*0.05));
  vec2 r = vec2(fbm(p + 1.7*q + vec2(1.7,9.2)), fbm(p + 1.7*q + vec2(8.3,2.8)));
  return fbm(p + 1.6*r);
}

vec3 modeInk(vec2 uv){
  vec2 p = uv;
  p.x *= aspect();
  vec2 ptr = uPointer; ptr.x *= aspect();
  vec2 toP = ptr - p;
  float d2 = dot(toP, toP);
  float pull = exp(-d2 * 5.0) * 0.9;
  p += toP * pull * 0.9;
  float f = flow(p * 2.3, uTime);
  vec3 col = mix(uPaper, uA2, smoothstep(0.15, 0.85, f));
  col = mix(col, uA1, smoothstep(0.6, 1.05, f) * 0.65);
  col = mix(col, uA3, pull * 0.8);
  float c = abs(fract(f * 7.0) - 0.5);
  col = mix(col, uInk, smoothstep(0.48, 0.5, c) * 0.05);
  return col;
}

vec3 modeGrid(vec2 uv){
  vec2 g = uv * vec2(aspect(), 1.0) * 15.0 + vec2(uTime * 0.14, uTime * 0.03);
  vec2 gf = abs(fract(g) - 0.5);
  float line = smoothstep(0.47, 0.5, max(gf.x, gf.y));
  float glowN = fbm(uv * 3.0 + uTime * 0.05);
  vec3 col = mix(uPaper, uA2, 0.12 + 0.12 * glowN);
  col = mix(col, uInk, line * 0.30);
  float hi = smoothstep(0.02, 0.0, abs(fract(uv.x - uTime * 0.05) - 0.5) - 0.02);
  col = mix(col, uA3, hi * 0.25);
  return col;
}

vec3 modeCircuit(vec2 uv){
  vec2 p = uv * vec2(aspect(), 1.0);
  float f = fbm(p * 4.5 + uTime * 0.04);
  float tr = abs(fract(f * 4.0) - 0.5);
  float line = smoothstep(0.055, 0.0, tr);
  float node = smoothstep(0.93, 1.0, fbm(p * 10.0 - uTime * 0.03));
  vec3 col = mix(uPaper, uA3, 0.05);
  col = mix(col, uA1, line * 0.22);
  col = mix(col, uA2, node * 0.45);
  return col;
}

vec3 modeDusk(vec2 uv){
  vec3 col = mix(uA2, uPaper, pow(uv.y, 1.2));
  float n = fbm(uv * 3.0 + uTime * 0.03) * 0.12;
  col += (uA3 - 0.5) * n;
  vec2 ptr = uPointer; ptr.x *= aspect();
  vec2 pp = uv; pp.x *= aspect();
  float glow = exp(-pow(distance(pp, ptr) * 1.6, 2.0));
  col = mix(col, uA1, glow * 0.35);
  return col;
}

vec3 modeAt(int i, vec2 uv){
  if(i <= 0) return modeInk(uv);
  if(i == 1) return modeGrid(uv);
  if(i == 2) return modeCircuit(uv);
  return modeDusk(uv);
}

vec3 pick(vec2 uv){
  float m = clamp(uMode, 0.0, 3.0);
  float lo = floor(m);
  float f = m - lo;
  vec3 col = modeAt(int(lo), uv);
  if(f > 0.004){
    col = mix(col, modeAt(int(lo) + 1, uv), f);
  }
  return col;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec3 col = pick(uv);
  vec2 c = uv - 0.5;
  float vig = smoothstep(1.1, 0.35, length(c));
  col *= mix(0.9, 1.0, vig);
  float g = hash(uv * uRes + uTime) - 0.5;
  col += g * 0.02;
  col = mix(uPaper, col, uIntensity);
  gl_FragColor = vec4(col, 1.0);
}
`
