/* main.js — ponto de entrada. Módulo nativo, sem bundler e sem dependência. */

import { montarLinks } from "./links.js";
import { iniciarNavegacao } from "./nav.js";
import { iniciarReveals } from "./reveal.js";
import { iniciarTrilhos } from "./track.js";
import { iniciarComparadores } from "./compare.js";
import { iniciarVideos } from "./video.js";
import { iniciarAcordeoes } from "./accordion.js";
import { iniciarCtaFlutuante } from "./sticky-cta.js";
import { iniciarRetrato3d } from "./retrato-3d.js";
import { iniciarHeroScroll } from "./hero-scroll.js";
import { iniciarEscrita } from "./escrita.js";
import { iniciarParallax } from "./parallax.js";
import { iniciarLeque } from "./leque.js";
import { iniciarRolagemTexto } from "./rolagem-texto.js";
import { iniciarSobrepor } from "./sobrepor.js";

const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.dataset.movimento = movimentoReduzido ? "reduzido" : "completo";

montarLinks();
iniciarNavegacao();
iniciarReveals(movimentoReduzido);
iniciarTrilhos();
iniciarComparadores();
iniciarVideos();
iniciarAcordeoes();
iniciarCtaFlutuante();
iniciarRetrato3d(movimentoReduzido);
iniciarHeroScroll(movimentoReduzido);
iniciarEscrita(movimentoReduzido);
iniciarParallax(movimentoReduzido);
iniciarLeque(movimentoReduzido);
iniciarRolagemTexto(movimentoReduzido);
iniciarSobrepor(movimentoReduzido);

document.querySelectorAll("[data-ano]").forEach((el) => (el.textContent = new Date().getFullYear()));
