/* escrita.js — entrada palavra a palavra, em cascata.
   Envolve cada palavra numa máscara de recorte e faz cada uma subir com
   defasagem, o que lê como a frase sendo escrita em vez de surgir inteira.

   O corte é feito percorrendo os nós de texto, e não pelo `innerHTML`: assim
   as palavras dentro de <em class="serif"> continuam dentro dele, e os
   espaços originais são preservados. */

const DEFASAGEM = 48;   // ms entre uma palavra e a seguinte

function embrulharPalavras(no, palavras) {
  [...no.childNodes].forEach((filho) => {
    if (filho.nodeType === Node.TEXT_NODE) {
      const partes = filho.textContent.split(/(\s+)/);
      const bloco = document.createDocumentFragment();

      partes.forEach((parte) => {
        if (parte === "") return;
        if (/^\s+$/.test(parte)) {
          bloco.appendChild(document.createTextNode(parte));
          return;
        }
        const fora = document.createElement("span");
        fora.className = "escrita__p";
        const dentro = document.createElement("span");
        dentro.className = "escrita__i";
        dentro.textContent = parte;
        fora.appendChild(dentro);
        bloco.appendChild(fora);
        palavras.push(dentro);
      });

      no.replaceChild(bloco, filho);
    } else if (filho.nodeType === Node.ELEMENT_NODE) {
      embrulharPalavras(filho, palavras);
    }
  });
}

export function iniciarEscrita(movimentoReduzido) {
  const alvos = [...document.querySelectorAll("[data-escrita]")];
  if (!alvos.length) return;

  if (movimentoReduzido || !("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("is-escrito"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-escrito");
        observador.unobserve(e.target);   // uma única vez, como manda design.md §11
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
  );

  alvos.forEach((alvo) => {
    const palavras = [];
    embrulharPalavras(alvo, palavras);

    /* Pontuação solta — o ponto que sobra depois de um <em>, por exemplo —
       herda o índice da palavra anterior, para subir junto com ela em vez de
       chegar um tempo depois. Não dá para movê-la para dentro do <em>: ela
       herdaria a cor de destaque. */
    let indice = -1;
    palavras.forEach((p) => {
      const soPontuacao = /^[.,;:!?…)\]}»"']+$/.test(p.textContent);
      if (!soPontuacao || indice < 0) indice += 1;
      p.style.setProperty("--i", String(indice));
    });
    alvo.style.setProperty("--defasagem", `${DEFASAGEM}ms`);
    observador.observe(alvo);
  });
}
