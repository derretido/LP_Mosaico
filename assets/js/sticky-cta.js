/* sticky-cta.js — CTA flutuante do mobile: aparece ao sair do hero e some
   quando o footer entra, para não cobrir o fecho da página. */

export function iniciarCtaFlutuante() {
  const cta = document.querySelector("[data-flutuante]");
  const hero = document.querySelector("[data-hero]");
  const footer = document.querySelector("[data-footer]");
  if (!cta || !hero) return;

  let passouHero = false;
  let noFooter = false;
  const aplicar = () => cta.classList.toggle("is-visivel", passouHero && !noFooter);

  new IntersectionObserver(
    ([e]) => { passouHero = !e.isIntersecting; aplicar(); },
    { threshold: 0 }
  ).observe(hero);

  if (footer) {
    new IntersectionObserver(
      ([e]) => { noFooter = e.isIntersecting; aplicar(); },
      { threshold: 0 }
    ).observe(footer);
  }
}
