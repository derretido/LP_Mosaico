/* links.js — resolve o destino de cada CTA a partir de config.js.
   Cada origem pode ter canal próprio: "agendar" vai para a plataforma de
   agendamento, as demais para o WhatsApp. Sem destino nenhum, o botão
   continua útil e leva à seção de agendamento da própria página. */
import { linkCTA, CONFIG } from "./config.js";

export function montarLinks() {
  document.querySelectorAll("[data-cta]").forEach((el) => {
    const destino = linkCTA(el.dataset.cta);
    if (destino) {
      el.href = destino;
      el.target = "_blank";
      el.rel = "noopener";
      el.removeAttribute("data-pendente");
    } else {
      el.href = "#agendar";          /* âncora interna: nunca um beco sem saída */
      el.dataset.pendente = "destino";
    }
  });

  document.querySelectorAll("[data-mapa]").forEach((el) => {
    if (CONFIG.mapa) {
      el.href = CONFIG.mapa;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.setAttribute("aria-disabled", "true");
      el.dataset.pendente = "mapa";
    }
  });

  document.querySelectorAll("[data-rede]").forEach((el) => {
    const url = CONFIG.redes[el.dataset.rede];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.setAttribute("aria-disabled", "true");
      el.dataset.pendente = "rede";
    }
  });
}
