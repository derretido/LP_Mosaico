/* leque.js — galeria em leque de cartas, aberta pela rolagem.

   Divisão de trabalho, igual à da hero: este módulo NÃO anima nada. Ele só
   (a) monta as cartas a partir de uma lista de dados e (b) escreve `--abertura`
   de 0 a 1 conforme a seção atravessa a tela. Quem desenha o leque é o CSS, em
   `translate`, `rotate` e `scale` — propriedades que o compositor resolve
   sozinho. Por ser progresso puro, o leque abre ao descer e fecha ao subir, e
   para junto quando a rolagem para.

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

  /* Sob movimento reduzido o leque já nasce aberto: o CSS tem `--abertura: 1`
     por padrão e nada aqui o altera. O conteúdo aparece completo e imediato,
     como design.md §11 exige. */
  if (movimentoReduzido) return;

  let raf = null;
  let anterior = -1;

  const medir = () => {
    raf = null;
    /* Medido pelo PALCO, não pela seção. O palco fica uns 200px abaixo do topo
       da seção, depois da etiqueta, do título e do lead: medindo pela seção, o
       leque terminava de abrir ANTES de entrar na tela, e o efeito não era
       visto. É a posição do próprio leque que tem de comandar a abertura. */
    const caixa = palco.getBoundingClientRect();
    const altura = window.innerHeight;

    /* Começa a abrir quando o topo do leque encosta na borda de baixo da tela
       e termina quando o leque está centrado verticalmente. Assim a abertura
       inteira acontece com o leque à vista. A conta é de posição, não de
       tempo, então o progresso acompanha a rolagem nos dois sentidos. */
    const inicio = altura;
    const fim = altura / 2 - caixa.height / 2;
    const bruto = (inicio - caixa.top) / (inicio - fim);
    const abertura = Math.min(1, Math.max(0, bruto));

    /* Duas casas bastam para o olho e evitam reescrever o estilo a cada
       quadro por uma diferença invisível. */
    const arredondado = Math.round(abertura * 100) / 100;
    if (arredondado !== anterior) {
      anterior = arredondado;
      /* Escrito no PALCO, que é onde o CSS declara o valor padrão. Escrever
         num ancestral não adiantaria se o padrão estivesse na carta:
         declaração local vence valor herdado. */
      palco.style.setProperty("--abertura", String(arredondado));
    }
  };

  const agendar = () => {
    if (raf === null) raf = requestAnimationFrame(medir);
  };

  medir();
  addEventListener("scroll", agendar, { passive: true });
  addEventListener("resize", agendar, { passive: true });
}
