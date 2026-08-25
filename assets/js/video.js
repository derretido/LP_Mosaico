/* video.js — fachada de vídeo: a capa é estática e o player só é criado
   depois do clique. Sem id de vídeo, o botão não finge que funciona. */

export function iniciarVideos() {
  document.querySelectorAll("[data-video]").forEach((fachada) => {
    const id = fachada.dataset.video;

    if (!id) {
      fachada.setAttribute("aria-disabled", "true");
      fachada.dataset.pendente = "video";
      fachada.addEventListener("click", (e) => e.preventDefault());
      return;
    }

    fachada.addEventListener("click", () => {
      const quadro = document.createElement("iframe");
      quadro.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      quadro.title = fachada.dataset.titulo || "Vídeo da Mosaico TV";
      quadro.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
      quadro.allowFullscreen = true;
      quadro.loading = "lazy";
      quadro.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
      fachada.replaceChildren(quadro);
      fachada.classList.add("is-tocando");
    }, { once: true });
  });
}
