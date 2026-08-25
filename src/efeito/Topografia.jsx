import { useEffect, useRef } from 'react';
import { VERT_TOPO, FRAG_TOPO } from './topografiaShaders';

/* Curvas de nível animadas, usadas como fundo das seções escuras.
   Mesmo encanamento WebGL2 escrito à mão da tinta da hero — sem `ogl` e sem
   nenhuma dependência nova. */

/* Uma volta do campo a cada 1400px de documento. Vale para todas as camadas:
   é o que faz as curvas continuarem de uma seção para a outra. */
const MUNDO_ESCALA = 1400;

/* Origem de tempo compartilhada. Cada instância montando com o próprio
   performance.now() defasaria a animação e as emendas voltariam a não bater. */
const T_INICIO = performance.now();

const INDICES_CTRL = [
  [1, -2, 3, -4],
  [9, -8, 7, -6],
  [5, 2, 5, -5],
  [-1, -3, 8, 9]
];

function compilar(gl, tipo, fonte) {
  const s = gl.createShader(tipo);
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error('shader: ' + log);
  }
  return s;
}

function programa(gl, fv, ff) {
  const v = compilar(gl, gl.VERTEX_SHADER, fv);
  const f = compilar(gl, gl.FRAGMENT_SHADER, ff);
  const p = gl.createProgram();
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.bindAttribLocation(p, 0, 'aPos');
  gl.linkProgram(p);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(p);
    gl.deleteProgram(p);
    throw new Error('program: ' + log);
  }
  return p;
}

function hexParaRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [1, 1, 1];
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
}

function modoParaFloat(modo) {
  if (modo === 'uniform') return 1;
  if (modo === 'alternating') return 2;
  return 0;
}

export default function Topografia({
  lowColor = '#C9CED6',
  midColor = '#7FE7FF',
  highColor = '#F2EFE9',
  speed = 0.35,
  morphAmount = 3,
  morphSpeed = 0.05,
  bands = 2,
  thickness = 0.01,
  scale = 2,
  pixelSize = 1,
  glow = 0.5,
  colorMode = 'elevation',
  contrast = 3,
  brightness = 1,
  fillBands = false,
  opacity = 1,
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseRadius = 0.3,
  mouseStrength = 0.4,
  escala = 0.7
}) {
  const refCanvas = useRef(null);

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance'
    });
    if (!gl) return undefined;

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let prog;
    try {
      prog = programa(gl, VERT_TOPO, FRAG_TOPO);
    } catch (erro) {
      console.error('[topografia]', erro.message);
      return undefined;
    }

    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const u = {};
    [
      'iResolution', 'iTime', 'uMorphAmount', 'uBands', 'uThickness', 'uScale',
      'uPixelSize', 'uGlow', 'uColorMode', 'uContrast', 'uBrightness', 'uFillBands',
      'uOpacity', 'uLow', 'uMid', 'uHigh', 'uMouse', 'uMouseEnabled', 'uMouseRadius',
      'uMouseStrength', 'uMouseActive', 'uGrain', 'uGrainIntensity',
      'uCtrlA', 'uCtrlB', 'uCtrlC', 'uCtrlD',
      'uMundoOrigem', 'uMundoEscala', 'uCssPorPixel'
    ].forEach(nome => (u[nome] = gl.getUniformLocation(prog, nome)));

    gl.useProgram(prog);
    gl.uniform1f(u.uMorphAmount, morphAmount);
    gl.uniform1f(u.uBands, bands);
    gl.uniform1f(u.uThickness, thickness);
    gl.uniform1f(u.uScale, scale);
    gl.uniform1f(u.uPixelSize, pixelSize);
    gl.uniform1f(u.uGlow, glow);
    gl.uniform1f(u.uColorMode, modoParaFloat(colorMode));
    gl.uniform1f(u.uContrast, contrast);
    gl.uniform1f(u.uBrightness, brightness);
    gl.uniform1f(u.uFillBands, fillBands ? 1 : 0);
    gl.uniform1f(u.uOpacity, opacity);
    gl.uniform1f(u.uGrain, grain ? 1 : 0);
    gl.uniform1f(u.uGrainIntensity, grainIntensity);
    gl.uniform3fv(u.uLow, hexParaRgb(lowColor));
    gl.uniform3fv(u.uMid, hexParaRgb(midColor));
    gl.uniform3fv(u.uHigh, hexParaRgb(highColor));
    gl.uniform1f(u.uMouseEnabled, mouseInteraction && !semMovimento ? 1 : 0);
    gl.uniform1f(u.uMouseRadius, mouseRadius);
    gl.uniform1f(u.uMouseStrength, mouseStrength);

    let largura = 0;
    let altura = 0;

    function dimensionar() {
      const r = canvas.getBoundingClientRect();
      let lCss = r.width;
      let aCss = r.height;
      if (lCss < 2 || aCss < 2) {
        const pai = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : null;
        lCss = (pai && pai.width) || window.innerWidth || 1;
        aCss = (pai && pai.height) || window.innerHeight || 1;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(lCss * dpr * escala));
      const h = Math.max(1, Math.round(aCss * dpr * escala));
      largura = w;
      altura = h;
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
    }

    /* O cursor é escutado na janela, e não no canvas: a camada fica com
       pointer-events desligado para o conteúdo da seção seguir clicável. */
    const cursor = { x: 0.5, y: 0.5, ax: 0.5, ay: 0.5, ativo: 0, alvoAtivo: 0 };
    const aoMover = e => {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const dentro =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!dentro) {
        cursor.alvoAtivo = 0;
        return;
      }
      cursor.x = (e.clientX - r.left) / r.width;
      cursor.y = 1 - (e.clientY - r.top) / r.height;
      cursor.alvoAtivo = 1;
    };

    const ctrl = [new Float32Array(4), new Float32Array(4), new Float32Array(4), new Float32Array(4)];

    function desenhar(agora) {
      const tempo = (agora - T_INICIO) * 0.001;

      /* A origem é lida a cada quadro, e não uma vez só: a camada do entorno
         da hero é `sticky` e se move dentro do documento enquanto está presa.
         Sem reler, o campo dela descolaria do das outras. */
      const caixa = canvas.getBoundingClientRect();
      const origemX = caixa.left + window.scrollX;
      const origemY = caixa.top + window.scrollY;
      const cssPorPixel = largura > 0 ? caixa.width / largura : 1;

      for (let g = 0; g < 4; g++) {
        const arr = ctrl[g];
        const idx = INDICES_CTRL[g];
        for (let j = 0; j < 4; j++) {
          const i = idx[j];
          arr[j] = morphAmount * Math.sin(tempo * speed * Math.sin(i * morphSpeed) + i);
        }
      }

      cursor.ax += 0.05 * (cursor.x - cursor.ax);
      cursor.ay += 0.05 * (cursor.y - cursor.ay);
      cursor.ativo += 0.05 * (cursor.alvoAtivo - cursor.ativo);

      gl.viewport(0, 0, largura, altura);
      gl.useProgram(prog);
      gl.uniform2f(u.iResolution, largura, altura);
      gl.uniform1f(u.iTime, tempo);
      gl.uniform4fv(u.uCtrlA, ctrl[0]);
      gl.uniform4fv(u.uCtrlB, ctrl[1]);
      gl.uniform4fv(u.uCtrlC, ctrl[2]);
      gl.uniform4fv(u.uCtrlD, ctrl[3]);
      gl.uniform2f(u.uMouse, cursor.ax, cursor.ay);
      gl.uniform1f(u.uMouseActive, cursor.ativo);
      gl.uniform2f(u.uMundoOrigem, origemX, origemY);
      gl.uniform1f(u.uMundoEscala, MUNDO_ESCALA);
      gl.uniform1f(u.uCssPorPixel, cssPorPixel);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    let raf = null;
    let rodando = false;
    let visivel = false;

    const laco = agora => {
      if (!rodando) return;
      desenhar(agora);
      raf = requestAnimationFrame(laco);
    };
    const iniciar = () => {
      if (rodando || semMovimento) return;
      rodando = true;
      raf = requestAnimationFrame(laco);
    };
    const parar = () => {
      rodando = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    };

    dimensionar();
    desenhar(performance.now());   // um quadro imediato, mesmo parado

    /* Sem interação de cursor a topografia é fundo puro: não vale registrar
       o listener nem manter o laço acordado por causa dele. */
    if (mouseInteraction && !semMovimento) {
      window.addEventListener('mousemove', aoMover, { passive: true });
    }

    const aoVisibilidade = () => {
      if (document.hidden) parar();
      else if (visivel) iniciar();
    };
    document.addEventListener('visibilitychange', aoVisibilidade);

    /* Só roda enquanto a seção está na tela: com duas instâncias na página,
       isso mantém no máximo uma ou duas ativas por vez. */
    const io = new IntersectionObserver(
      entradas => {
        visivel = entradas[0].isIntersecting;
        if (visivel && !document.hidden) iniciar();
        else parar();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      dimensionar();
      if (semMovimento) desenhar(performance.now());
    });
    ro.observe(canvas);

    return () => {
      parar();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', aoVisibilidade);
      window.removeEventListener('mousemove', aoMover);
      gl.deleteProgram(prog);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={refCanvas} className="topografia" aria-hidden="true" />;
}
