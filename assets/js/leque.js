/* leque.js — galeria em leque de cartas, aberta ao entrar na tela.

   Divisão de trabalho, igual à da hero: este módulo NÃO anima nada. Ele só
   (a) monta as cartas a partir de uma lista de dados e (b) vira `--abertura`
   de 0 para 1 UMA VEZ, quando a seção aparece. Quem desenha e quem anima o
   leque é o CSS, em `translate`, `rotate` e `scale` com uma transição sobre
   `--abertura` — propriedades que o compositor resolve sozinho.

   Mudança de 2026-08-27: o leque deixou de ser dirigido pelo progresso da
   rolagem (decisão de 2026-08-22). Agora ele começa fechado — só a carta
   central à vista — e abre sozinho, em cascata de dentro para fora, quando a
   seção entra na tela. Não reage mais à rolagem depois disso.

   Por que não GSAP: descartado em 2026-08-20 por decisão registrada. Pesaria
   ~70KB sobre um orçamento de JavaScript já estourado, e o `pin` do
   ScrollTrigger prende mexendo no DOM. Este arquivo tem menos de 3KB e não
   toca na estrutura da página.

   A geometria do leque mora no CSS, não aqui: o JavaScript escreve apenas os
   índices de cada carta (`--i` com sinal, `--d` a distância do centro) e o
   CSS multiplica por passos que mudam em cada faixa de tela. É isso que faz o
   leque responder a media query sem uma linha de JavaScript por breakpoint. */

/* Trocar as fotos é trocar esta lista — nada de HTML por imagem.
   A ORDEM É A DO LEQUE, da esquerda para a direita: o item do meio é a carta
   central, a que fica reta, maior e na frente de todas. Hoje é a FotoM07,
   por escolha do cliente.
   Todas em 3:4, que é a proporção do card — nenhuma é recortada. */
export const POSTS = [
  { src: "/assets/img/redes/post-05.avif", w: 640, h: 854,
    alt: "Retrato de família em cenário de Natal." },
  { src: "/assets/img/redes/post-01.avif", w: 640, h: 845,
    alt: "Pessoa de boné e regata diante de uma parede pintada." },
  { src: "/assets/img/redes/post-02.avif", w: 640, h: 849,
    alt: "Retrato de corpo inteiro em rua, com camisa preta." },
  { src: "/assets/img/redes/post-07.avif", w: 640, h: 849,
    alt: "Pessoa de moletom e óculos escuros, em retrato de perto." },
  { src: "/assets/img/redes/post-04.avif", w: 640, h: 855,
    alt: "Pessoa sentada na cadeira de barbeiro da Mosaico." },
  { src: "/assets/img/redes/post-03.avif", w: 640, h: 849,
    alt: "Retrato em espelho, com camiseta estampada." },
  { src: "/assets/img/redes/post-06.avif", w: 640, h: 854,
    alt: "Retrato de família em cenário de Natal." },
];

/* Quanto cada passo de distância atrasa a saída daquela carta, em fração do
   progresso total. É o que faz o leque ABRIR DE DENTRO PARA FORA: no começo
   só a carta central aparece e as outras estão escondidas atrás dela; depois
   elas vão saindo em cascata, das de dentro para as das pontas. */
const ATRASO = 0.1;

function montarCartas(palco, posts) {
  const meio = (posts.length - 1) / 2;

  /* Com a última carta começando a sair em `meio * ATRASO`, sobra esta janela
     de progresso para ela completar o percurso. Sem normalizar por ela, as
     cartas de fora nunca chegariam ao fim do leque. */
  palco.style.setProperty("--janela", String(1 - meio * ATRASO));
  const fragmento = document.createDocumentFragment();

  posts.forEach((post, indice) => {
    const i = indice - meio;          /* com sinal: negativo à esquerda */
    const d = Math.abs(i);            /* distância do centro, para o arco */

    /* O arco LEVANTA a carta central em vez de baixar as laterais: assim a
       carta mais externa fica em zero e nada desce para fora do palco, que
       tem altura reservada. Cresce com o quadrado da distância, que é o que
       dá curva de leque em vez de rampa reta. */
    const arco = meio * meio - d * d;

    const carta = document.createElement("figure");
    carta.className = "c-leque__carta";
    carta.style.setProperty("--i", String(i));
    carta.style.setProperty("--d", String(d));
    carta.style.setProperty("--arco", String(arco));
    carta.style.setProperty("--atraso", String(d * ATRASO));
    /* A carta central fica na frente e as laterais recuam uma camada por
       passo. O hover sobe acima de todas, pelo CSS. */
    carta.style.zIndex = String(posts.length - Math.round(d));

    const img = document.createElement("img");
    img.className = "c-leque__foto";
    img.src = post.src;
    img.alt = post.alt;
    img.width = post.w;    /* dimensões declaradas: site.md §13 */
    img.height = post.h;
    img.loading = "lazy";
    img.decoding = "async";
    img.draggable = false;

    carta.appendChild(img);
    fragmento.appendChild(carta);
  });

  palco.appendChild(fragmento);
}

export function iniciarLeque(movimentoReduzido) {
  const secao = document.querySelector("[data-leque]");
  if (!secao) return;

  const palco = secao.querySelector("[data-leque-palco]");
  if (!palco || palco.children.length) return;

  montarCartas(palco, POSTS);

  /* Sob movimento reduzido, ou sem IntersectionObserver, o leque já nasce
     aberto: o CSS tem `--abertura: 1` por padrão e nada aqui o altera. O
     conteúdo aparece completo e imediato, como design.md §11 exige. */
  if (movimentoReduzido || !("IntersectionObserver" in window)) return;

  /* Com JavaScript e movimento normal, o leque começa FECHADO — todas as
     cartas empilhadas atrás da central — e abre uma vez quando a seção entra
     na tela. A transição de `--abertura` e a cascata por `--atraso` moram no
     CSS; aqui só se vira a chave. Escrito no PALCO, que é onde o CSS declara o
     valor padrão: declaração local venceria o valor herdado. */
  palco.style.setProperty("--abertura", "0");

  /* Assenta o estado fechado ANTES de armar a transição: sem este reflow, a
     mudança de 1 (padrão do CSS) para 0 dispararia a transição e o leque
     fecharia sozinho no carregamento. Com a transição armada só depois, a
     primeira animação é a abertura, quando a seção aparece. */
  void palco.offsetWidth;
  palco.classList.add("is-leque-armado");

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        palco.style.setProperty("--abertura", "1");
        observador.unobserve(e.target);   /* uma única vez, design.md §11 */
      });
    },
    { threshold: 0.35 }
  );

  observador.observe(palco);
}
