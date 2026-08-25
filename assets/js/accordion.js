/* accordion.js — acordeão do FAQ. Um botão de verdade, uma região de verdade,
   altura animada por grid-template-rows (sem salto de layout). */

export function iniciarAcordeoes() {
  document.querySelectorAll("[data-acordeao]").forEach((acordeao) => {
    const gatilhos = acordeao.querySelectorAll("[data-acordeao-gatilho]");

    gatilhos.forEach((gatilho) => {
      gatilho.addEventListener("click", () => {
        const item = gatilho.closest(".c-acordeao__item");
        const aberto = gatilho.getAttribute("aria-expanded") === "true";

        if (acordeao.dataset.acordeao === "unico" && !aberto) {
          gatilhos.forEach((outro) => {
            outro.setAttribute("aria-expanded", "false");
            outro.closest(".c-acordeao__item")?.classList.remove("is-aberto");
          });
        }

        gatilho.setAttribute("aria-expanded", String(!aberto));
        item?.classList.toggle("is-aberto", !aberto);
      });
    });
  });
}
