/* Shaders da tinta neon da hero.
   Tudo é gerado por procedimento: nenhuma imagem entra aqui. */

export const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/* Passe do rastro: acumula o carimbo do cursor num buffer pequeno,
   com leve borrão e decaimento. É o que dá o "rastro líquido". */
export const FRAG_RASTRO = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uAnterior;
uniform vec2  uPx;          // 1 / tamanho do buffer
uniform vec2  uCursor;      // posição atual, em uv
uniform vec2  uCursorAnt;   // posição do quadro anterior, em uv
uniform float uForca;       // 0..1, vem da velocidade do cursor
uniform float uRaio;
uniform float uAspecto;
uniform float uDecaimento;

// distância até o segmento entre dois pontos: o rastro não quebra
// quando o cursor anda rápido entre um quadro e outro
float distSegmento(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  float s = texture(uAnterior, vUv).r * 4.0;
  s += texture(uAnterior, vUv + vec2(uPx.x, 0.0)).r;
  s += texture(uAnterior, vUv - vec2(uPx.x, 0.0)).r;
  s += texture(uAnterior, vUv + vec2(0.0, uPx.y)).r;
  s += texture(uAnterior, vUv - vec2(0.0, uPx.y)).r;
  float v = (s / 8.0) * uDecaimento;

  vec2 esc = vec2(uAspecto, 1.0);
  float d = distSegmento(vUv * esc, uCursorAnt * esc, uCursor * esc);
  float carimbo = exp(-(d * d) / (uRaio * uRaio)) * uForca;

  fragColor = vec4(max(v, carimbo), 0.0, 0.0, 1.0);
}`;

export const FRAG_TINTA = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2      uRes;
uniform float     uTempo;
uniform float     uEntrada;     // 0..1, faz a tinta surgir no carregamento
uniform vec2      uCursor;      // no mesmo espaço das manchas
uniform float     uCursorForca;
uniform sampler2D uRastro;

const vec3 VERDE    = vec3(0.784, 0.906, 0.224);  // #c8e739
const vec3 ROSA     = vec3(0.973, 0.129, 0.447);  // #f82172
const vec3 VERMELHO = vec3(0.929, 0.173, 0.141);  // #ed2c24

/* Simplex noise 3D — Ashima Arts / Stefan Gustavson, domínio público. */
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * snoise(p);
    p = p * 2.03 + vec3(11.3, 7.7, 3.1);
    a *= 0.5;
  }
  return s;
}

vec2 hash2(float n) {
  return fract(sin(vec2(n, n + 1.7)) * vec2(43758.5453, 22578.1459)) * 2.0 - 1.0;
}

/* Núcleo de suporte compacto: a contribuição zera em 2r, então as manchas
   se fundem entre vizinhas sem inundar a tela inteira. */
float nucleo(vec2 d, float r) {
  float k = max(0.0, 1.0 - dot(d, d) / (r * r) * 0.25);
  return k * k * k;
}

/* Composição assimétrica em coordenadas NORMALIZADAS (-1..1 na área
   visível). Multiplicadas pela meia-extensão da tela, alcançam as bordas e os
   cantos em qualquer proporção — sem isso a tinta fica presa no meio.
   xy = centro, z = raio, w = semente de fase. */
const vec4 MANCHAS[17] = vec4[17](
  vec4(-0.52,  0.24, 0.360, 0.00),   // massa dominante, à esquerda
  vec4( 0.54,  0.06, 0.300, 1.71),   // segunda massa, à direita
  vec4(-0.18, -0.50, 0.215, 3.42),   // desce pela esquerda
  vec4( 0.16,  0.60, 0.200, 5.13),   // sobe pelo meio
  vec4(-0.90, -0.28, 0.180, 0.84),   // borda esquerda
  vec4( 0.92, -0.44, 0.165, 2.55),   // borda direita
  vec4(-0.96,  0.70, 0.175, 4.26),   // canto superior esquerdo
  vec4( 0.40, -0.84, 0.160, 5.97),   // faixa de baixo
  vec4( 0.00,  0.94, 0.185, 1.28),   // faixa de cima
  vec4(-0.64, -0.90, 0.170, 2.90),   // canto inferior esquerdo
  vec4( 0.86,  0.72, 0.170, 4.70),   // canto superior direito
  vec4( 0.70, -0.98, 0.150, 0.35),   // canto inferior direito
  vec4(-0.08, -0.08, 0.150, 3.95),   // liga o centro
  vec4(-1.02,  0.04, 0.130, 5.55),   // sangra pela esquerda
  vec4(-0.36,  0.86, 0.155, 2.10),   // topo, à esquerda
  vec4( 0.30, -0.30, 0.120, 4.95),   // meio, à direita
  vec4( 1.02, -0.02, 0.125, 0.60)    // sangra pela direita
);

float campoManchas(vec2 q, float t, vec2 ext, float escalaR) {
  float f = 0.0;
  for (int i = 0; i < 17; i++) {
    vec4 m = MANCHAS[i];
    vec2 c = m.xy * ext + 0.018 * vec2(sin(t * 0.11 + m.w), cos(t * 0.09 + m.w * 1.7));
    float r = m.z * escalaR * (1.0 + 0.075 * sin(t * 0.21 + m.w * 2.1));   // respiração
    vec2 d = q - c;
    float a = m.w;
    d = mat2(cos(a), -sin(a), sin(a), cos(a)) * d;
    d.x *= 1.0 + 0.38 * sin(m.w * 3.0);                          // alongamento
    f += 2.2 * nucleo(d, r);
  }
  return f;
}

float campoGotas(vec2 q, float t, vec2 ext, float escalaR) {
  float f = 0.0;
  for (int i = 0; i < 18; i++) {
    float fi = float(i);
    vec2 c = hash2(fi * 7.13 + 0.5) * ext * 1.02;
    c += 0.014 * vec2(sin(t * 0.13 + fi), cos(t * 0.11 + fi * 1.3));
    float r = (0.010 + 0.027 * fract(sin(fi * 91.7) * 4321.98)) * escalaR;
    f += 2.2 * nucleo(q - c, r);
  }
  return f;
}

/* Verde nas beiradas, vermelho no meio do caminho, rosa no corpo —
   é a ordem que aparece na referência. */
vec3 rampa(float x) {
  vec3 c = mix(VERDE, VERMELHO, smoothstep(0.06, 0.46, x));
  return mix(c, ROSA, smoothstep(0.44, 0.82, x));
}

void main() {
  float t = uTempo;

  // Espaço da composição: acompanha a tela sem esmagar as manchas no celular.
  float aspecto = uRes.x / uRes.y;
  float zoom = clamp(aspecto / 1.4, 0.55, 1.0);
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y / zoom;

  // Meia-extensão visível neste espaço: é o que amarra a composição à tela.
  vec2 ext = vec2(aspecto * 0.5, 0.5) / zoom;
  float escalaR = clamp(sqrt(ext.x * ext.y), 0.48, 0.80);

  float rastro = texture(uRastro, vUv).r;

  // Duas camadas de deformação de domínio: a primeira faz a silhueta
  // irregular, a segunda abre os picos e as ramificações finas.
  vec2 w1 = vec2(fbm(vec3(p * 1.8, t * 0.06)),
                 fbm(vec3(p * 1.8 + 31.4, t * 0.06)));
  vec2 q = p + 0.115 * w1;
  vec2 w2 = vec2(fbm(vec3(q * 5.0, t * 0.10)),
                 fbm(vec3(q * 5.0 + 17.0, t * 0.10)));
  q += 0.052 * w2;
  vec2 w3 = vec2(snoise(vec3(q * 14.0, t * 0.13)),
                 snoise(vec3(q * 14.0 + 5.0, t * 0.13)));
  q += 0.013 * w3;

  // O cursor empurra a tinta para fora e engrossa a região por onde passou.
  vec2 dc = p - uCursor;
  float distc = length(dc);
  q += normalize(dc + 1e-5) * rastro * 0.055;
  q += normalize(dc + 1e-5) * exp(-distc * distc / 0.012) * uCursorForca * 0.03;

  float f = campoManchas(q, t, ext, escalaR) + campoGotas(q, t, ext, escalaR);
  f *= 1.0 + 0.46 * fbm(vec3(q * 4.0, t * 0.07));
  // Cumes de ruído aplicados só na faixa da borda: é o que abre os picos,
  // as ramificações finas e as extensões de tinta se espalhando.
  // pow() com base negativa é indefinido em GLSL e (f - 1.0) fica negativo
  // fora da mancha: a faixa da borda é calculada com multiplicação.
  float e1 = (f - 1.0) * 1.6;
  float cume = 1.0 - abs(snoise(vec3(q * 6.5, t * 0.05)));
  f += cume * cume * 0.36 * exp(-e1 * e1);
  float e2 = (f - 1.0) * 2.6;
  float cume2 = 1.0 - abs(snoise(vec3(q * 15.0, t * 0.08)));
  f += cume2 * cume2 * 0.16 * exp(-e2 * e2);
  f += rastro * 0.18;   // leve inchaço onde passou; revelar é o papel principal
  f *= mix(0.34, 1.0, uEntrada);

  float aa = max(fwidth(f), 1e-4) * 0.8;
  float tinta = smoothstep(1.0 - aa, 1.0 + aa, f);

  // Respingos escuros dentro da tinta, só longe da borda.
  float miolo = smoothstep(1.12, 1.75, f);
  float respingo = smoothstep(0.62, 0.80, snoise(vec3(q * 42.0, t * 0.02)));
  tinta *= 1.0 - respingo * miolo * 0.78;

  // Mistura das três cores por ruído: nunca blocos chapados.
  float m1 = fbm(vec3(q * 1.7 + 5.0, t * 0.045)) * 0.5 + 0.5;
  float m2 = fbm(vec3(q * 3.3 - 9.0, t * 0.035)) * 0.5 + 0.5;
  // Sem esticar o contraste, fbm fica preso perto de 0.5 e a tinta inteira
  // sai vermelha. Aqui o desvio em torno do meio é ampliado.
  float mistura = clamp((m1 - 0.5) * 2.7 + (m2 - 0.5) * 1.5 + 0.54, 0.0, 1.0);
  vec3 cor = rampa(mistura);

  // Beirada puxando para o verde, como na parede da referência.
  float beirada = 1.0 - smoothstep(1.0, 1.55, f);
  cor = mix(cor, VERDE, beirada * 0.34);

  // Halo neon curto do lado de fora da borda.
  float halo = exp(-abs(f - 1.0) * 8.0) * (1.0 - tinta);

  // Máscara de revelação: a tinta só existe onde o rastro passou. O ruído
  // some com a borda circular do carimbo e devolve um contorno de tinta.
  float ruidoRevela = fbm(vec3(q * 3.2, t * 0.09)) * 0.22;
  float revela = smoothstep(0.07, 0.34, rastro + ruidoRevela);
  tinta *= revela;
  halo *= revela;

  vec3 saida = cor * tinta + rampa(mistura) * halo * 0.22;

  // Grão fino, contra banda de cor no preto.
  float grao = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  saida += (grao - 0.5) * 0.016;

  fragColor = vec4(max(saida, vec3(0.0)), 1.0);
}`;
