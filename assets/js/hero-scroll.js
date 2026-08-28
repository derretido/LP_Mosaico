/* hero-scroll.js — progresso de rolagem da hero.
   Não anima nada por conta própria: só mede onde a pista está e escreve
   `--progresso` (0 a 1). Quem transforma é o CSS, em propriedades que o
   compositor resolve sozinho. Por isso a animação acompanha a rolagem quadro a
   quadro, para nos dois sentidos, e para junto quando a rolagem para.

   O prender é `position: sticky` nativo, não JavaScript: sem mexer no DOM,
   sem espaçador e sem deslocamento de layout. */

/* Tamanho que o palco deve ter no fim da animação, em pixels de tela.
   Como a escala é uniforme (senão o retrato e a tinta esticariam), o palco
   CABE dentro dessa caixa: a dimensão que aperta primeiro bate no alvo e a
   outra fica igual ou menor. */
const ALVO_LARGURA = 550;
const ALVO_ALTURA = 350;

export function iniciarHeroScroll(movimentoReduzido) {
  const pista = document.querySelector("[data-hero-pista]");
  if (!pista || movimentoReduzido) return;

  let raf = null;
  let anterior = -1;

  /* A escala final depende do tamanho da janela, então é recalculada a cada
     redimensionamento. O CSS interpola de 1 até ela. */
  const calcularEscalaFinal = () => {
    const escala = Math.min(
      ALVO_LARGURA / window.innerWidth,
      ALVO_ALTURA / window.innerHeight
    );
    pista.style.setProperty("--escala-final", Math.min(1, escala).toFixed(4));
  };

  const medir = () => {
    raf = null;
    const caixa = pista.getBoundingClientRect();
    const curso = caixa.height - window.innerHeight;   // distância útil da pista
    if (curso <= 0) return;

    const p = Math.min(1, Math.max(0, -caixa.top / curso));
    if (Math.abs(p - anterior) < 0.0005) return;       // nada a escrever
    anterior = p;
    pista.style.setProperty("--progresso", p.toFixed(4));
  };

  const agendar = () => {
    if (raf === null) raf = requestAnimationFrame(medir);
  };

  const aoRedimensionar = () => {
    calcularEscalaFinal();
    agendar();
  };

  window.addEventListener("scroll", agendar, { passive: true });
  window.addEventListener("resize", aoRedimensionar);

  calcularEscalaFinal();
  medir();   // a página pode abrir já rolada
}
