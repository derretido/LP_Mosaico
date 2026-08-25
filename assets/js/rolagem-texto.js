/* rolagem-texto.js — título que rola letra a letra, como um painel de aeroporto.

   PORTE, NÃO INSTALAÇÃO. O efeito veio de um componente React (motion-primitives
   TextRoll) que pedia shadcn, Tailwind, TypeScript e a dependência `motion`.
   Nada disso existe aqui — o projeto é HTML/CSS/JS estático, com React apenas
   dentro de `src/efeito/` para os shaders —, e instalar tudo aquilo para animar
   um título custaria ~30KB sobre um orçamento de JavaScript já estourado. O que
   foi trazido é a MECÂNICA, em menos de 2KB.

   Como o efeito funciona: cada letra ganha DUAS cópias sobrepostas em 3D. A de
   cima começa reta e gira 90° para trás, saindo de vista; a de baixo começa
   deitada em 90° e gira até ficar reta, entrando no lugar. Como as duas mostram
   a mesma letra, o olho lê um giro no próprio eixo. A defasagem por letra é o
   que transforma isso em cascata.

   Este módulo só prepara a estrutura e marca o índice de cada letra. Quem gira
   é o CSS, em `transform` — o compositor resolve sozinho e não há layout shift:
   uma terceira cópia, invisível, segura a largura da letra. */

const DEFASAGEM = 42;   /* ms entre uma letra e a seguinte */

/* O corte percorre os NÓS DE TEXTO, e não o innerHTML: assim as letras dentro
   de <em class="serif"> continuam dentro dele e mantêm a cor e a família de
   destaque. É a mesma disciplina do escrita.js do Manifesto. */
function embrulharLetras(no, letras) {
  [...no.childNodes].forEach((filho) => {
    if (filho.nodeType === Node.TEXT_NODE) {
      const bloco = document.createDocumentFragment();

      [...filho.textContent].forEach((caractere) => {
        /* Espaço fica como espaço de verdade, fora da estrutura 3D: embrulhado
           (ou trocado por espaço fixo, como fazia o componente de origem) ele
           impediria o título de quebrar linha, e no celular o título precisa
           quebrar. */
        if (caractere === " ") {
          bloco.appendChild(document.createTextNode(" "));
          return;
        }

        const caixa = document.createElement("span");
        caixa.className = "rolagem__letra";
        /* Fora da árvore de acessibilidade: sem isto o leitor de tela soletra
           "M-o-s-a-i-c-o" e AINDA lê a cópia íntegra do fim, duas vezes e
           errado. Quem carrega o texto legível é o .vo. */
        caixa.setAttribute("aria-hidden", "true");

        const saindo = document.createElement("span");
        saindo.className = "rolagem__face rolagem__face--sai";
        saindo.textContent = caractere;

        const entrando = document.createElement("span");
        entrando.className = "rolagem__face rolagem__face--entra";
        entrando.textContent = caractere;

        /* Segura a largura da letra para as duas faces poderem ser absolutas
           sem derrubar o layout. Fica fora da árvore de acessibilidade porque
           o texto legível é o do .vo no fim do título. */
        const espaco = document.createElement("span");
        espaco.className = "rolagem__espaco";
        espaco.textContent = caractere;

        caixa.append(saindo, entrando, espaco);
        bloco.appendChild(caixa);
        letras.push(caixa);
      });

      no.replaceChild(bloco, filho);
    } else if (filho.nodeType === Node.ELEMENT_NODE) {
      embrulharLetras(filho, letras);
    }
  });
}

export function iniciarRolagemTexto(movimentoReduzido) {
  const alvos = [...document.querySelectorAll("[data-rolagem]")];
  if (!alvos.length) return;

  alvos.forEach((alvo) => {
    /* O título picado em letras vira ruído para leitor de tela. O texto
       original volta como uma cópia só para leitura, e o que sobrou fica
       escondido da árvore de acessibilidade pelo CSS. */
    const texto = alvo.textContent.trim();
    const letras = [];
    embrulharLetras(alvo, letras);
    letras.forEach((letra, i) => letra.style.setProperty("--i", String(i)));

    const leitura = document.createElement("span");
    leitura.className = "vo";
    leitura.textContent = texto;
    alvo.appendChild(leitura);
    alvo.style.setProperty("--defasagem", `${DEFASAGEM}ms`);
  });

  /* Sem animação quando o sistema pede movimento reduzido: o título já nasce
     no estado final, completo e imediato (design.md §11). */
  if (movimentoReduzido || !("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("is-rolado"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-rolado");
        observador.unobserve(e.target);   /* uma única vez, design.md §11 */
      });
    },
    { threshold: 0.4 }
  );

  alvos.forEach((alvo) => observador.observe(alvo));
}
