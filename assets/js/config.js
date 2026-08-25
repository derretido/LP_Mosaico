/* ==========================================================================
   config.js — O ÚNICO ARQUIVO QUE PRECISA SER EDITADO PARA O SITE IR AO AR.
   Enquanto um campo estiver vazio, o comportamento que depende dele fica
   desligado com elegância: nenhum botão vira beco sem saída.
   ========================================================================== */

export const CONFIG = {
  /* Telefone em formato internacional, só dígitos. Ex.: "5511999999999" */
  whatsapp: "5511973217359",

  /* Destino por origem do CTA. Quando uma origem tem destino próprio aqui,
     ele MANDA e o WhatsApp não é usado para ela.

     "agendar" vai para o ZapCorte por decisão do cliente em 2026-08-22, que
     substituiu a adoção assumida do WhatsApp registrada em site.md §8. As
     outras origens continuam caindo no WhatsApp, que é o canal do card de
     cursos no próprio index.html. */
  destinos: {
    agendar: "https://bio.zapcorte.com.br/mosaicoconcept"
  },

  /* Mensagens prontas. O parâmetro de origem diz de onde veio o clique.
     Só valem para as origens que caem no WhatsApp. */
  mensagens: {
    agendar: "Olá! Vim pelo site e quero agendar um horário na Mosaico.",
    curso:   "Olá! Vim pelo site e quero saber sobre os cursos presenciais da Mosaico.",
    live:    "Olá! Vim pelo site e quero saber sobre a Live Criativo na Tesoura.",
    parceria:"Olá! Vim pelo site e gostaria de falar sobre parceria com a Mosaico."
  },

  /* Link do mapa (Google/Apple). Abre em nova aba no botão "Como chegar". */
  mapa: "",

  /* Redes sociais ativas. Deixe vazio o que não existir. */
  /* Endereços limpos de propósito: os links vieram com parâmetros de
     compartilhamento (`igsi` no Instagram, `_r` e `_t` no TikTok) que são
     tokens da sessão de quem compartilhou. Expiram, não servem num link
     público e carregam contexto de conta que não deve ir para o site. */
  redes: {
    instagram: "https://www.instagram.com/mosaicooff",
    youtube: "https://www.youtube.com/@mosaicotv23",
    tiktok: "https://www.tiktok.com/@mosaicooff"
  }
};

/* Destino de um CTA, por origem. A ordem importa: destino próprio primeiro,
   WhatsApp depois, e null se nenhum dos dois existir — é o null que faz o
   botão cair na âncora interna em vez de virar beco sem saída. */
export function linkCTA(origem) {
  const proprio = CONFIG.destinos[origem];
  if (proprio) return proprio;
  if (!CONFIG.whatsapp) return null;
  const texto = CONFIG.mensagens[origem] || CONFIG.mensagens.agendar;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}
