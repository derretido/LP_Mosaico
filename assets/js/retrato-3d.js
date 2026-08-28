/* retrato-3d.js — micro inclinação 3D do retrato da hero, seguindo o ponteiro.
   É acabamento, não espetáculo: poucos graus e poucos pixels, sem deslocar
   layout. A sombra anda no sentido contrário, e é essa separação entre as duas
   camadas que dá a sensação de profundidade.
   Desligado no mobile e sob prefers-reduced-motion (design.md §11 e §12). */

const GIRO_MAX = 2.6;     // graus
const DESLOC_MAX = 9;     // px
const SUAVIDADE = 0.09;   // quanto do caminho até o alvo é vencido por quadro
const PARADO = 0.0008;    // abaixo disso o laço encerra

export function iniciarRetrato3d(movimentoReduzido) {
  const retrato = document.querySelector("[data-retrato]");
  // O palco, não a section: a section virou pista de rolagem e mede mais de
  // uma dobra, o que jogaria a normalização do cursor para fora.
  const hero = document.querySelector("[data-hero-palco]") || document.querySelector("[data-hero]");
  if (!retrato || !hero || movimentoReduzido) return;
  if (!window.matchMedia("(min-width: 768px)").matches) return;

  let destinoX = 0;
  let destinoY = 0;
  let atualX = 0;
  let atualY = 0;
  let raf = null;

  const aplicar = () => {
    retrato.style.setProperty("--giro-x", `${(-atualY * GIRO_MAX).toFixed(3)}deg`);
    retrato.style.setProperty("--giro-y", `${(atualX * GIRO_MAX).toFixed(3)}deg`);
    retrato.style.setProperty("--desloc-x", `${(atualX * DESLOC_MAX).toFixed(2)}px`);
    retrato.style.setProperty("--desloc-y", `${(atualY * DESLOC_MAX).toFixed(2)}px`);
  };

  const quadro = () => {
    atualX += (destinoX - atualX) * SUAVIDADE;
    atualY += (destinoY - atualY) * SUAVIDADE;

    if (Math.abs(destinoX - atualX) < PARADO && Math.abs(destinoY - atualY) < PARADO) {
      atualX = destinoX;
      atualY = destinoY;
      aplicar();
      raf = null;          // chegou: o laço para em vez de girar à toa
      return;
    }
    aplicar();
    raf = requestAnimationFrame(quadro);
  };

  const acordar = () => {
    if (raf === null) raf = requestAnimationFrame(quadro);
  };

  const repousar = () => {
    destinoX = 0;
    destinoY = 0;
    acordar();
  };

  window.addEventListener(
    "mousemove",
    (e) => {
      const r = hero.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const dentro =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom;
      if (!dentro) return repousar();
      destinoX = ((e.clientX - r.left) / r.width) * 2 - 1;
      destinoY = ((e.clientY - r.top) / r.height) * 2 - 1;
      acordar();
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", repousar);
}
