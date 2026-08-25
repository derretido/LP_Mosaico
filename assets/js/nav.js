/* nav.js — estado do header, item ativo da navegação e painel mobile. */

export function iniciarNavegacao() {
  const header = document.querySelector("[data-header]");
  const sentinela = document.querySelector("[data-sentinela]");
  const botao = document.querySelector("[data-menu]");
  const painel = document.querySelector("[data-painel]");
  const links = [...document.querySelectorAll("[data-nav] a")];

  /* --- Header encolhe e o CTA entra depois dos 80px (site.md §8) --- */
  if (header && sentinela) {
    new IntersectionObserver(
      ([entrada]) => header.classList.toggle("is-rolado", !entrada.isIntersecting),
      { threshold: 0 }
    ).observe(sentinela);
  }

  /* --- Item ativo: a seção mais alta que está cruzando o meio da tela --- */
  const secoes = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (secoes.length) {
    const visiveis = new Set();
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) visiveis.add(e.target.id);
          else visiveis.delete(e.target.id);
        });
        const atual = secoes.find((s) => visiveis.has(s.id));
        links.forEach((a) => {
          const ativo = atual && a.getAttribute("href") === `#${atual.id}`;
          if (ativo) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    secoes.forEach((s) => observador.observe(s));
  }

  /* --- Painel de tela cheia: foco preso, Esc fecha, rolagem travada --- */
  if (!botao || !painel) return;

  const focaveis = () =>
    [...painel.querySelectorAll('a[href], button:not([disabled])')].filter(
      (el) => el.offsetParent !== null
    );

  let ultimoFoco = null;

  const abrir = () => {
    ultimoFoco = document.activeElement;
    painel.classList.add("is-aberto");
    painel.removeAttribute("inert");
    botao.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-travado");
    focaveis()[0]?.focus();
  };

  const fechar = () => {
    painel.classList.remove("is-aberto");
    painel.setAttribute("inert", "");
    botao.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-travado");
    ultimoFoco?.focus();
  };

  const aberto = () => painel.classList.contains("is-aberto");

  botao.addEventListener("click", () => (aberto() ? fechar() : abrir()));
  painel.addEventListener("click", (e) => {
    if (e.target.closest("a")) fechar();
  });

  document.addEventListener("keydown", (e) => {
    if (!aberto()) return;
    if (e.key === "Escape") { e.preventDefault(); fechar(); return; }
    if (e.key !== "Tab") return;
    const lista = focaveis();
    if (!lista.length) return;
    const primeiro = lista[0];
    const ultimo = lista[lista.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  });

  painel.setAttribute("inert", "");
}
