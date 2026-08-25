/* track.js — trilho horizontal do portfólio.
   Arraste com inércia curta, setas, teclado e indicador de progresso.
   A roda vertical NUNCA é sequestrada: só o gesto lateral de trackpad
   (deltaX) avança o trilho — design.md §11 e §13. */

export function iniciarTrilhos() {
  document.querySelectorAll("[data-trilho]").forEach((trilho) => {
    const pista = trilho.querySelector("[data-pista]");
    const barra = trilho.querySelector("[data-progresso]");
    const anterior = trilho.querySelector("[data-anterior]");
    const proximo = trilho.querySelector("[data-proximo]");
    if (!pista) return;

    const passo = () => pista.querySelector(".c-trilho__lista > *")?.getBoundingClientRect().width || 320;

    const atualizar = () => {
      const maximo = pista.scrollWidth - pista.clientWidth;
      const razao = pista.clientWidth / pista.scrollWidth;
      const progresso = maximo > 0 ? pista.scrollLeft / maximo : 0;
      if (barra) {
        barra.style.setProperty("--extensao", `${Math.min(razao, 1) * 100}%`);
        barra.style.setProperty("--deslocamento", `${progresso * (1 / razao - 1) * 100}%`);
      }
      if (anterior) anterior.disabled = pista.scrollLeft <= 2;
      if (proximo) proximo.disabled = pista.scrollLeft >= maximo - 2;
    };

    const mover = (direcao) =>
      pista.scrollBy({ left: direcao * (passo() + 24), behavior: "smooth" });

    anterior?.addEventListener("click", () => mover(-1));
    proximo?.addEventListener("click", () => mover(1));

    /* Teclado: a pista é focável e responde às setas */
    pista.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); mover(-1); }
      if (e.key === "Home") { e.preventDefault(); pista.scrollTo({ left: 0, behavior: "smooth" }); }
      if (e.key === "End")  { e.preventDefault(); pista.scrollTo({ left: pista.scrollWidth, behavior: "smooth" }); }
    });

    /* Arraste por ponteiro, com inércia curta */
    let arrastando = false, inicioX = 0, inicioScroll = 0, ultimoX = 0, velocidade = 0, ultimoTempo = 0;

    pista.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;   /* no toque, o scroll nativo é melhor */
      arrastando = true;
      inicioX = ultimoX = e.clientX;
      inicioScroll = pista.scrollLeft;
      velocidade = 0;
      ultimoTempo = performance.now();
      pista.setPointerCapture(e.pointerId);
      pista.classList.add("is-arrastando");
    });

    pista.addEventListener("pointermove", (e) => {
      if (!arrastando) return;
      const agora = performance.now();
      const delta = e.clientX - ultimoX;
      const dt = Math.max(1, agora - ultimoTempo);
      velocidade = delta / dt;
      ultimoX = e.clientX;
      ultimoTempo = agora;
      pista.scrollLeft = inicioScroll - (e.clientX - inicioX);
    });

    const soltar = () => {
      if (!arrastando) return;
      arrastando = false;
      pista.classList.remove("is-arrastando");
      const impulso = velocidade * 120;
      if (Math.abs(impulso) > 24) {
        pista.scrollBy({ left: -impulso, behavior: "smooth" });
      }
    };
    pista.addEventListener("pointerup", soltar);
    pista.addEventListener("pointercancel", soltar);
    pista.addEventListener("dragstart", (e) => e.preventDefault());

    /* Só o eixo lateral do trackpad. deltaY segue rolando a página. */
    pista.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation();
    }, { passive: true });

    pista.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    atualizar();
  });
}
