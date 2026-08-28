import { useEffect, useRef } from 'react';
import { VERT, FRAG_TINTA, FRAG_RASTRO } from './tintaShaders';
import './TintaNeon.css';

const LADO_RASTRO = 512;      // buffer do rastro no desktop; no celular cai para 256
const ATRASO_VULTO = 1600;    // ms parado até o vulto assumir
const VEL_VULTO = 0.30;       // uv por segundo — atravessa a dobra em ~3s
const MARGEM_X = 0.02;        // até onde o vulto encosta na parede lateral
const MARGEM_Y = 0.04;        // e no teto e no chão
const INCLINACAO = 0.42;      // vy/vx: quanto o zigue-zague desce a cada ida
const RAIO_CURSOR = 0.105;
const RAIO_VULTO = 0.095;
const TETO_PIXELS = 2.6e6;    // proteção para telas muito grandes
const TETO_TOQUE = 4.5e5;     // teto duro no celular: o viewport é travado em
                              // 1280px CSS (index.html), então sem este limite
                              // o canvas mediria ~1280x2775 e a GPU do aparelho
                              // não dá conta, nem a de um iPhone recente

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

function programa(gl, fontVert, fontFrag) {
  const v = compilar(gl, gl.VERTEX_SHADER, fontVert);
  const f = compilar(gl, gl.FRAGMENT_SHADER, fontFrag);
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

function alvoRastro(gl, lado) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, lado, lado, 0,
                gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { tex, fbo };
}

export default function TintaNeon({ escalaDesktop = 0.75, escalaMobile = 0.5 }) {
  const refCanvas = useRef(null);

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });
    if (!gl) return undefined;

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // NÃO por largura: o viewport está travado em 1280px (index.html, decisão de
    // 2026-08-26), então `max-width: 767px` nunca casa no celular e todas as
    // reduções abaixo ficavam desligadas justamente no aparelho. `pointer:
    // coarse` é o gancho que separa toque de mouse — o mesmo que o CSS do
    // retrato já usa.
    const ehToque = window.matchMedia('(pointer: coarse)').matches;

    // No toque o shader roda numa versão mais barata: menos oitavas de ruído
    // e sem as camadas de detalhe fino (gota, segundo cume, terceira deformação)
    // que quase não se veem numa tela pequena e atrás do grão. A silhueta e a
    // paleta são as mesmas.
    const fragTinta = ehToque
      ? FRAG_TINTA.replace('precision highp float;', 'precision highp float;\n#define LEVE 1')
      : FRAG_TINTA;

    let progTinta;
    let progRastro;
    try {
      progTinta = programa(gl, VERT, fragTinta);
      progRastro = programa(gl, VERT, FRAG_RASTRO);
    } catch (erro) {
      console.error('[tinta-neon]', erro.message);
      return undefined;
    }

    // Um único triângulo cobre a tela inteira: menos vértices que um quad.
    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const uT = {
      res: gl.getUniformLocation(progTinta, 'uRes'),
      tempo: gl.getUniformLocation(progTinta, 'uTempo'),
      entrada: gl.getUniformLocation(progTinta, 'uEntrada'),
      cursor: gl.getUniformLocation(progTinta, 'uCursor'),
      cursorForca: gl.getUniformLocation(progTinta, 'uCursorForca'),
      rastro: gl.getUniformLocation(progTinta, 'uRastro')
    };
    const uR = {
      anterior: gl.getUniformLocation(progRastro, 'uAnterior'),
      px: gl.getUniformLocation(progRastro, 'uPx'),
      cursor: gl.getUniformLocation(progRastro, 'uCursor'),
      cursorAnt: gl.getUniformLocation(progRastro, 'uCursorAnt'),
      forca: gl.getUniformLocation(progRastro, 'uForca'),
      raio: gl.getUniformLocation(progRastro, 'uRaio'),
      aspecto: gl.getUniformLocation(progRastro, 'uAspecto'),
      decaimento: gl.getUniformLocation(progRastro, 'uDecaimento')
    };

    // ---- estado -----------------------------------------------------------

    // Buffer do rastro menor no toque: é uma máscara já borrada, 256 basta
    // e poupa banda de memória da GPU.
    const ladoRastro = ehToque ? 256 : LADO_RASTRO;

    // Trava de quadros no toque: a tinta se move devagar (ruído a 0.05..0.13,
    // vulto a 0.30 uv/s), então 30fps é indistinguível de 60 e corta metade do
    // trabalho de GPU. ALVO_MS e PISO_ESCALA alimentam o auto-ajuste.
    const MIN_MS_QUADRO = ehToque ? 32 : 0;
    const ALVO_MS = ehToque ? 1000 / 30 : 1000 / 60;
    const PISO_ESCALA = ehToque ? 0.30 : 0.42;

    let a = alvoRastro(gl, ladoRastro);
    let b = alvoRastro(gl, ladoRastro);

    let escala = ehToque ? escalaMobile : escalaDesktop;
    let largura = 1;
    let altura = 1;

    const cursor = { x: 0.5, y: 0.5, forca: 0, dentro: false };
    const compos = { x: 0, y: 0 };

    // Fonte do carimbo: ora o cursor, ora o vulto. Guarda a posição anterior
    // para o rastro ser carimbado ao longo do segmento, sem furos.
    const fonte = { x: 0.5, y: 0.5, ax: 0.5, ay: 0.5, forca: 0, raio: RAIO_CURSOR };
    let vultoAtivo = null;   // null enquanto ninguém assumiu

    // Começa ocioso de propósito: o vulto entra logo no carregamento e a tinta
    // aparece sem o visitante precisar fazer nada.
    let ultimaInteracao = -1e9;

    /* Trajetória fixa em zigue-zague: anda em linha reta e reflete ao bater
       nas paredes, como bola de bilhar. A inclinação faz cada ida atravessar
       a dobra descendo (ou subindo), então a varredura cobre a tela inteira
       sem depender de sorteio. */
    const passo = Math.hypot(1, INCLINACAO);
    const vulto = { x: 0.06, y: 0.18, dx: 1 / passo, dy: INCLINACAO / passo, ultimoMs: 0 };

    function moverVulto(dt) {
      vulto.x += vulto.dx * VEL_VULTO * dt;
      vulto.y += vulto.dy * VEL_VULTO * dt;

      if (vulto.x <= MARGEM_X) {
        vulto.x = MARGEM_X;
        vulto.dx = Math.abs(vulto.dx);
      } else if (vulto.x >= 1 - MARGEM_X) {
        vulto.x = 1 - MARGEM_X;
        vulto.dx = -Math.abs(vulto.dx);
      }
      if (vulto.y <= MARGEM_Y) {
        vulto.y = MARGEM_Y;
        vulto.dy = Math.abs(vulto.dy);
      } else if (vulto.y >= 1 - MARGEM_Y) {
        vulto.y = 1 - MARGEM_Y;
        vulto.dy = -Math.abs(vulto.dy);
      }
    }

    let t0 = performance.now();
    let ultimoDesenho = performance.now();
    let rodando = false;
    let raf = null;
    let visivel = true;
    let rolando = false;          // celular: pausa o shader enquanto a página rola
    let timerRolagem = null;
    let amostras = 0;
    let somaQuadros = 0;

    function dimensionar() {
      const r = canvas.getBoundingClientRect();
      let larguraCss = r.width;
      let alturaCss = r.height;
      // Se a medida sair degenerada — o efeito pode rodar antes do layout —
      // cai para a caixa do pai e, em último caso, para a janela. Sem isso o
      // canvas trava em tamanho zero e nunca mais é corrigido.
      if (larguraCss < 2 || alturaCss < 2) {
        const pai = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : null;
        larguraCss = (pai && pai.width) || window.innerWidth || 1;
        alturaCss = (pai && pai.height) || window.innerHeight || 1;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, ehToque ? 1 : 2);
      let w = Math.max(1, Math.round(larguraCss * dpr * escala));
      let h = Math.max(1, Math.round(alturaCss * dpr * escala));
      const total = w * h;
      const teto = ehToque ? TETO_TOQUE : TETO_PIXELS;
      if (total > teto) {
        const k = Math.sqrt(teto / total);
        w = Math.max(1, Math.round(w * k));
        h = Math.max(1, Math.round(h * k));
      }
      largura = w;
      altura = h;
      // Comparar com o canvas, e não com um cache, evita ficar preso num
      // tamanho antigo quando a primeira medida veio errada.
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
    }

    // Mesma conta do shader, para o cursor cair no lugar certo.
    function paraComposicao(nx, ny) {
      const aspecto = largura / altura;
      const zoom = Math.min(1, Math.max(0.55, aspecto / 1.4));
      compos.x = ((nx - 0.5) * aspecto) / zoom;
      compos.y = (ny - 0.5) / zoom;
    }

    function moverCursor(clientX, clientY) {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const dentro =
        clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
      cursor.dentro = dentro;
      if (!dentro) return;
      const nx = (clientX - r.left) / r.width;
      const ny = 1 - (clientY - r.top) / r.height;
      const dx = nx - cursor.x;
      const dy = ny - cursor.y;
      const veloc = Math.sqrt(dx * dx + dy * dy);
      // quanto mais rápido o cursor, mais forte a perturbação; a parcela fixa
      // garante que um movimento lento também revele tinta
      cursor.forca = Math.min(1, cursor.forca + veloc * 9 + 0.18);
      cursor.x = nx;
      cursor.y = ny;
      ultimaInteracao = performance.now();
    }

    const aoMover = e => moverCursor(e.clientX, e.clientY);
    const aoTocar = e => {
      if (e.touches.length !== 1) return;
      moverCursor(e.touches[0].clientX, e.touches[0].clientY);
    };
    const aoSair = () => {
      cursor.dentro = false;
    };

    function passeRastro() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, b.fbo);
      gl.viewport(0, 0, ladoRastro, ladoRastro);
      gl.useProgram(progRastro);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, a.tex);
      gl.uniform1i(uR.anterior, 0);
      gl.uniform2f(uR.px, 1 / ladoRastro, 1 / ladoRastro);
      gl.uniform2f(uR.cursor, fonte.x, fonte.y);
      gl.uniform2f(uR.cursorAnt, fonte.ax, fonte.ay);
      gl.uniform1f(uR.forca, fonte.forca);
      gl.uniform1f(uR.raio, fonte.raio);
      gl.uniform1f(uR.aspecto, largura / altura);
      // Quanto o rastro perde por quadro. Manda no tempo que a tinta fica na
      // tela depois da passagem: 0.972 dá cerca de 2s até sumir.
      gl.uniform1f(uR.decaimento, 0.972);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      const tmp = a;
      a = b;
      b = tmp;
    }

    function passeTinta(tempo, entrada) {
      gl.viewport(0, 0, largura, altura);
      gl.useProgram(progTinta);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, a.tex);
      gl.uniform1i(uT.rastro, 0);
      gl.uniform2f(uT.res, largura, altura);
      gl.uniform1f(uT.tempo, tempo);
      gl.uniform1f(uT.entrada, entrada);
      gl.uniform2f(uT.cursor, compos.x, compos.y);
      gl.uniform1f(uT.cursorForca, fonte.forca);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    /* Decide de onde sai o carimbo do rastro. O cursor manda enquanto estiver
       se mexendo dentro da hero; passado ATRASO_VULTO sem nada, o vulto assume
       e atravessa a dobra sozinho, revelando a tinta por onde passa. */
    function atualizarFonte(agoraMs, tempo) {
      const ocioso = agoraMs - ultimaInteracao > ATRASO_VULTO || !cursor.dentro;

      if (!ocioso) {
        if (vultoAtivo !== false) {
          // troca de fonte: sem posição anterior, senão o rastro risca a tela
          fonte.ax = cursor.x;
          fonte.ay = cursor.y;
          vultoAtivo = false;
        }
        fonte.x = cursor.x;
        fonte.y = cursor.y;
        fonte.forca = cursor.forca;
        fonte.raio = RAIO_CURSOR;
        return;
      }

      if (vultoAtivo !== true) {
        // o vulto continua de onde o cursor parou, em vez de saltar
        if (cursor.dentro) {
          vulto.x = Math.min(1 - MARGEM_X, Math.max(MARGEM_X, cursor.x));
          vulto.y = Math.min(1 - MARGEM_Y, Math.max(MARGEM_Y, cursor.y));
        }
        fonte.ax = vulto.x;
        fonte.ay = vulto.y;
        vulto.ultimoMs = agoraMs;
        vultoAtivo = true;
      }

      let dt = (agoraMs - vulto.ultimoMs) / 1000;
      vulto.ultimoMs = agoraMs;
      if (dt > 0.2) dt = 0.016;

      moverVulto(dt);

      fonte.x = vulto.x;
      fonte.y = vulto.y;
      fonte.raio = RAIO_VULTO;
      fonte.forca = 0.72 + 0.18 * Math.sin(tempo * 0.6);   // respira
    }

    function quadro(agora) {
      if (!rodando) return;
      raf = requestAnimationFrame(quadro);

      // Trava de 30fps no celular: pula o quadro se veio cedo demais.
      if (agora - ultimoDesenho < MIN_MS_QUADRO) return;
      const dtReal = agora - ultimoDesenho;
      ultimoDesenho = agora;

      const tempo = (agora - t0) / 1000;
      const entrada = Math.min(1, tempo / 1.6);   // a tinta surge, não pisca

      atualizarFonte(agora, tempo);
      paraComposicao(fonte.x, fonte.y);
      passeRastro();
      passeTinta(tempo, entrada);

      fonte.ax = fonte.x;
      fonte.ay = fonte.y;
      cursor.forca *= 0.82;  // solta rápido assim que o cursor para

      // Mede o intervalo REAL entre quadros, não o tempo de CPU em volta do
      // drawArrays: numa GPU de celular o custo do shader só aparece aqui.
      // Passou de 1.5x o alvo por 60 quadros seguidos, a resolução encolhe.
      if (dtReal < 200) {
        somaQuadros += dtReal;
        amostras++;
      }
      if (amostras >= 60) {
        const medio = somaQuadros / amostras;
        amostras = 0;
        somaQuadros = 0;
        if (medio > ALVO_MS * 1.5 && escala > PISO_ESCALA) {
          escala = Math.max(PISO_ESCALA, escala * 0.8);
          dimensionar();
        }
      }
    }

    function iniciar() {
      if (rodando || semMovimento || rolando) return;
      rodando = true;
      ultimoDesenho = performance.now();
      raf = requestAnimationFrame(quadro);
    }
    function parar() {
      rodando = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    /* No celular, a GPU é compartilhada entre o shader e o compositor da
       rolagem: um shader de tela cheia a cada quadro faz o scroll engasgar.
       Enquanto o dedo rola, o laço para e o último quadro fica congelado na
       tela — imperceptível, porque tudo está passando —, e volta 180ms depois
       que a rolagem cessa. t0 é adiantado pela pausa para a animação não pular. */
    const aoRolar = () => {
      if (!rolando) {
        rolando = true;
        parar();
      }
      clearTimeout(timerRolagem);
      timerRolagem = setTimeout(() => {
        rolando = false;
        if (visivel && !document.hidden) {
          t0 += performance.now() - ultimoDesenho;
          iniciar();
        }
      }, 180);
    };

    dimensionar();
    // Um quadro imediato: a tinta já está lá quando a página aparece,
    // mesmo antes do primeiro requestAnimationFrame.
    paraComposicao(cursor.x, cursor.y);
    passeTinta(semMovimento ? 3.7 : 0, 1);

    if (!semMovimento) {
      window.addEventListener('mousemove', aoMover, { passive: true });
      window.addEventListener('touchstart', aoTocar, { passive: true });
      window.addEventListener('touchmove', aoTocar, { passive: true });
      window.addEventListener('mouseout', aoSair, { passive: true });
      if (ehToque) {
        // Congela o shader durante a rolagem: no toque, GPU e compositor
        // disputam o mesmo hardware. `touchmove` além de `scroll` porque na
        // rolagem por impulso o `scroll` chega atrasado.
        window.addEventListener('scroll', aoRolar, { passive: true });
        window.addEventListener('touchmove', aoRolar, { passive: true });
      }
    }

    const aoVisibilidade = () => {
      if (document.hidden) parar();
      else if (visivel) {
        t0 = performance.now() - 1600;   // não reinicia a entrada
        iniciar();
      }
    };
    document.addEventListener('visibilitychange', aoVisibilidade);

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
      // Com movimento reduzido não há laço: redimensionar sem redesenhar
      // deixaria a hero em branco. Aqui o quadro único é refeito.
      if (semMovimento) {
        paraComposicao(cursor.x, cursor.y);
        passeTinta(3.7, 1);
      }
    });
    ro.observe(canvas);

    if (!document.hidden) iniciar();

    return () => {
      parar();
      clearTimeout(timerRolagem);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', aoVisibilidade);
      window.removeEventListener('mousemove', aoMover);
      window.removeEventListener('touchstart', aoTocar);
      window.removeEventListener('touchmove', aoTocar);
      window.removeEventListener('mouseout', aoSair);
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('touchmove', aoRolar);
      gl.deleteProgram(progTinta);
      gl.deleteProgram(progRastro);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      [a, b].forEach(alvo => {
        gl.deleteTexture(alvo.tex);
        gl.deleteFramebuffer(alvo.fbo);
      });
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [escalaDesktop, escalaMobile]);

  return <canvas ref={refCanvas} className="tinta-neon" aria-hidden="true" />;
}
