/* parallax.js — deslocamento sutil por rolagem.
   Cada elemento com [data-sobe] recebe `--sobe` em pixels, calculado a partir
   de onde ele está na tela: abaixo do centro desce um pouco, acima do centro
   sobe. Como a amplitude é diferente por coluna (definida no CSS), os cards
   não se movem em bloco e a grade parece estar subindo.

   Nada é animado por aqui: o JavaScript só escreve o número e o CSS aplica um
   translate3d, que o compositor resolve. Desligado no celular e sob
   prefers-reduced-motion, conforme design.md §11 e §12. */

export function iniciarParallax(movimentoReduzido) {
  const alvos = [...document.querySelectorAll("[data-sobe]")];
  if (!alvos.length || movimentoReduzido) return;
  if (!window.matchMedia("(min-width: 768px)").matches) return;

  let raf = null;
  const visiveis = new Set();

  /* Só calcula o que está na tela: fora dela o número não seria visto. */
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) visiveis.add(e.target);
        else {
          visiveis.delete(e.target);
          e.target.style.setProperty("--sobe", "0px");
        }
      });
      agendar();
    },
    { rootMargin: "20% 0px 20% 0px" }
  );
  alvos.forEach((el) => observador.observe(el));

  const medir = () => {
    raf = null;
    const meia = window.innerHeight / 2;
    visiveis.forEach((el) => {
      const r = el.getBoundingClientRect();
      const centro = r.top + r.height / 2;
      // -1 quando o card está no topo da tela, +1 quando está no fim
      const posicao = Math.max(-1, Math.min(1, (centro - meia) / meia));
      const amplitude = parseFloat(getComputedStyle(el).getPropertyValue("--amplitude")) || 20;
      el.style.setProperty("--sobe", `${(posicao * amplitude).toFixed(1)}px`);
    });
  };

  const agendar = () => {
    if (raf === null) raf = requestAnimationFrame(medir);
  };

  window.addEventListener("scroll", agendar, { passive: true });
  window.addEventListener("resize", agendar);
  medir();
}
