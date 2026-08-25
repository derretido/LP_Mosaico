/* reveal.js — entrada por rolagem: opacidade 0→1 + 24px, uma única vez,
   com 60ms de defasagem entre irmãos. Desligado em movimento reduzido. */

export function iniciarReveals(movimentoReduzido) {
  const alvos = document.querySelectorAll(".revelar");
  if (movimentoReduzido || !("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("is-visivel"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        const irmaos = [...e.target.parentElement.querySelectorAll(":scope > .revelar")];
        const indice = Math.max(0, irmaos.indexOf(e.target));
        e.target.style.setProperty("--atraso", `${Math.min(indice, 6) * 60}ms`);
        e.target.classList.add("is-visivel");
        observador.unobserve(e.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );

  alvos.forEach((el) => observador.observe(el));
}
