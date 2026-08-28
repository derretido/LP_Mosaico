import { createRoot } from 'react-dom/client';
import TintaNeon from './TintaNeon';
import Topografia from './Topografia';

/* Fundo da hero: tinta neon gerada por shader, sobre preto.
   Paleta aprovada em 2026-08-20 (#c8e739, #f82172, #ed2c24) — as cores
   vivem no shader, em src/efeito/tintaShaders.js. */

function suportaWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

const alvo = document.getElementById('hero-efeito');

/* Sem WebGL2 a hero fica no preto, sem erro. O componente cuida sozinho
   de prefers-reduced-motion: desenha um quadro e não anima (site.md §12). */
if (alvo && suportaWebGL2()) {
  createRoot(alvo).render(<TintaNeon />);
}

/* Topografia de fundo. Duas paletas cinza, porque as linhas precisam de
   contraste contra fundos opostos: claras sobre as seções escuras, escuras
   sobre as claras. Nenhuma cor de acento — o efeito é textura, não sinal. */
const PALETAS = {
  // Sobre o escuro, as linhas ficam poucos pontos de luminância acima do fundo
  // (Carvão tem 19): 24, 42 e 67. É o que faz o efeito ler como relevo do
  // material, e não como desenho por cima dele.
  escuro: { low: '#1A1815', mid: '#2E2A25', high: '#474239', opacidade: 1 },
  // Sobre o claro, o mesmo raciocínio invertido: pouco abaixo do fundo.
  claro: { low: '#D8D4CB', mid: '#C6C1B7', high: '#AEA99E', opacidade: 1 }
};

/* A topografia só existe com MOUSE. São CINCO camadas: no celular elas somariam
   cinco contextos WebGL ao da tinta da hero, num orçamento de desempenho que
   site.md §13 já dá como estourado, e justamente no aparelho com menos memória
   e menos GPU. Decisão do cliente em 2026-08-22.

   O gancho é `pointer: fine`, e não `min-width: 768px`: o viewport está travado
   em 1280px (index.html), então a largura casa sempre e a topografia estava
   montando os seis contextos no celular, contra a própria decisão de 22/08.

   Montagem e desmontagem seguem a media query em vez de olhar uma vez só: a
   limpeza do componente libera o contexto de verdade (loseContext), então
   desmontar devolve memória em vez de só esconder a camada. */
const FAIXA_TOPOGRAFIA = window.matchMedia('(pointer: fine)');
const raizes = new Map();

function montarTopografia() {
  document.querySelectorAll('[data-topografia]').forEach(caixa => {
    if (raizes.has(caixa)) return;
    const p = PALETAS[caixa.dataset.topografia] || PALETAS.escuro;
    const raiz = createRoot(caixa);
    raizes.set(caixa, raiz);
    raiz.render(
      <Topografia
        lowColor={p.low}
        midColor={p.mid}
        highColor={p.high}
        opacity={p.opacidade}
        speed={0.35}
        morphAmount={3}
        morphSpeed={0.05}
        bands={2}
        thickness={0.01}
        scale={2}
        pixelSize={1}
        glow={0.15}
        colorMode="elevation"
        contrast={3}
        brightness={1}
        fillBands={false}
        grain
        grainIntensity={0.05}
        mouseInteraction={false}
        escala={0.6}
      />
    );
  });
}

function desmontarTopografia() {
  raizes.forEach(raiz => raiz.unmount());
  raizes.clear();
}

function sincronizarTopografia() {
  if (FAIXA_TOPOGRAFIA.matches) montarTopografia();
  else desmontarTopografia();
}

if (suportaWebGL2()) {
  sincronizarTopografia();
  FAIXA_TOPOGRAFIA.addEventListener('change', sincronizarTopografia);
}
