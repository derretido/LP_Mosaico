/* compare.js — comparador antes/depois.
   O controle é um input[type=range] de verdade por baixo: teclado, leitor de
   tela e toque funcionam sem código extra. */

export function iniciarComparadores() {
  document.querySelectorAll("[data-comparador]").forEach((bloco) => {
    const campo = bloco.querySelector("[data-comparador-campo]");
    if (!campo) return;
    const aplicar = () => bloco.style.setProperty("--posicao", `${campo.value}%`);
    campo.addEventListener("input", aplicar);
    aplicar();
  });
}
