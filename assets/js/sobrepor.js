/* sobrepor.js — calcula onde a seção de baixo prende.

   O EFEITO EM SI NÃO PRECISA DE JAVASCRIPT. Quem faz a transição é
   `position: sticky` mais ordem de documento mais `z-index`: a seção anterior
   congela, a próxima sobe por cima, e como é a própria rolagem que move a
   camada, ela acompanha o dedo, para junto e desfaz ao subir. Nenhum listener
   de rolagem é registrado aqui.

   Este módulo resolve UMA conta que o CSS não consegue fazer sozinho.

   O pedido era prender no FIM da seção anterior — o usuário lê a frase
   inteira e só então ela congela. Isso é a semântica de `sticky` com
   `bottom`, mas medi neste navegador e ela não prende: com `bottom: 0` a
   borda inferior continua subindo com a rolagem, enquanto com `top: 0` ela
   trava. Só que `top: 0` prende mostrando o COMEÇO da seção, e o Manifesto é
   mais alto que a dobra — só o <h1> tem oito linhas —, então os CTAs, que
   vivem no fim, ficariam permanentemente abaixo da tela.

   A saída é prender pelo topo com deslocamento NEGATIVO: `top` igual à altura
   que sobra (dobra menos seção). Assim a seção congela mostrando a última
   dobra dela, CTAs à vista, que é exatamente o que `bottom` faria. A conta
   depende do tamanho da janela e da altura do texto, então é refeita a cada
   redimensionamento.

   Sem JavaScript o CSS cai em `top: 0`: prende pelo começo em vez do fim, o
   que é pior mas continua funcionando. */

export function iniciarSobrepor(movimentoReduzido) {
  const bases = [...document.querySelectorAll("[data-sobrepor-base]")];
  if (!bases.length || movimentoReduzido) return;

  const medir = () => {
    bases.forEach((base) => {
      /* offsetHeight, e não getBoundingClientRect: o rect já vem com o
         deslocamento do sticky aplicado, então usá-lo aqui realimentaria a
         conta a cada medida. */
      const sobra = window.innerHeight - base.offsetHeight;
      base.style.setProperty("--topo-preso", `${Math.min(0, Math.round(sobra))}px`);
    });
  };

  medir();

  /* Só no redimensionamento: a altura da seção muda com a largura da janela
     (o texto reflui) e com a barra do navegador no celular. */
  let pendente = null;
  addEventListener(
    "resize",
    () => {
      if (pendente !== null) return;
      pendente = requestAnimationFrame(() => {
        pendente = null;
        medir();
      });
    },
    { passive: true }
  );
}
