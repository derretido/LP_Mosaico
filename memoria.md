# memoria.md — Histórico vivo do projeto Mosaico

Registro apenas o que ajuda na continuidade: decisões, mudanças de rumo, problemas e pendências.
Cada entrada é datada. Entradas novas vão no topo de cada área.

---

## Decisões aprovadas

**2026-08-27 — O leque de "Nas redes" deixa de ser dirigido pela rolagem e passa a tocar sozinho ao entrar na tela.** Pedido do cliente, confirmado depois de eu apontar o conflito. **Substitui as decisões de 2026-08-22** ("galeria em leque de sete cartas, aberta pela rolagem" e "leque que abre descendo e fecha subindo, com o progresso da rolagem controlando a abertura") e torna sem objeto o problema registrado no mesmo dia sobre o leque "abrir fora da tela" — não há mais o que medir. O leque agora começa fechado (só a carta central à vista) e abre uma vez, em cascata de dentro para fora, quando a seção aparece; não reage mais à rolagem depois disso. A recusa do GSAP continua valendo pelos mesmos motivos. **O título "Mosaico nas redes" mantém o giro letra a letra** ao entrar na tela — o cliente escolheu preservá-lo.

**2026-08-23 — A marca da hero volta a ser TIPOGRAFADA, em Archivo.** Pedido do cliente: "uma fonte normal". Substitui o desenho geométrico em `path` de 22/08, que por sua vez tinha substituído o desenho no caráter da Nighty. **Nenhuma fonte nova entrou** — Archivo já é a família de display do projeto, então o site segue com três arquivos de fonte.

**Consequência assumida, pela terceira vez neste projeto:** forma tipográfica é preenchida, não traço com centro, então a marca deixa de poder ser ESCRITA por `stroke-dashoffset` e volta a ser REVELADA por varredura da esquerda para a direita. O cliente foi avisado antes.

**2026-08-22 (fim do dia) — Entra a faixa "Platinado Concept" entre o Manifesto e o Platinado, com transição por sobreposição.** Pedido do cliente a partir de uma referência do site do Lando Norris: a seção anterior congela e a próxima sobe do rodapé da tela por cima dela até cobri-la. **Acrescenta uma seção às 13** de `site.md` §6 (agora são 15 com "Nas redes"), sem reordenar as outras.

**GSAP recusado pela terceira vez, e desta vez o motivo é melhor que a ausência.** O pedido era condicional ("se possuir, prefiro") e ele não está instalado. Mas **este efeito não precisa de JavaScript nenhum**: `position: sticky` mais ordem de documento mais `z-index` já produzem uma animação dirigida pela rolagem por definição — acompanha o dedo quadro a quadro, para quando a rolagem para, desfaz ao subir. Sem `pinSpacing`, sem espaçador injetado no DOM e sem risco de conflito com os nove módulos de rolagem que já existem.

**2026-08-22 (fim do dia) — A marca da hero vira MOSAICO CONCEPT, em caixa alta, desenhada em geométrica monolinear.** Substitui, no mesmo dia, o desenho no caráter da Nighty. O cliente escolheu entre três direções apresentadas — grotesca (Archivo 800), serifada (Instrument Serif) e desenhada geométrica — e ficou com a **desenhada**, pelas duas razões que a distinguem: é a única que não se confunde com a tipografia do resto do site, e a única que **devolve a escrita pela rolagem**, porque traço tem centro para a caneta percorrer e forma cheia não tem.

**CONCEPT é tipografado, não desenhado**, em Archivo — que já está no projeto, então não entra fonte nova. Em corpo pequeno o traço à mão sairia sujo. Fica menor e bem espaçado sob MOSAICO, composição escolhida pelo cliente entre três.

**Nenhuma fonte comercial entrou.** A Nighty foi descartada por três motivos somados: licença webfont, exceção à regra de duas famílias de `design.md` §3 (recém-reconciliada com a saída da Caveat Brush) e a incompatibilidade com a escrita pela rolagem.

**2026-08-22 — A assinatura da hero passa a ser no estilo da fonte Nighty, e deixa de ser escrita para ser revelada.** Pedido do cliente, a partir de uma captura da fonte. Nighty **não é script**: é uma display serifada setentista — letras cheias, contraste forte entre grosso e fino, serifas em cunha arredondada, bojos estufados.

**A fonte não foi instalada, e por três motivos.** É comercial e exigiria licença webfont; abriria de novo a exceção à regra de duas famílias de `design.md` §3, que tinha acabado de ser reconciliada com a saída da Caveat Brush; e o cliente escolheu, entre as alternativas apresentadas, que eu **desenhasse imitando o caráter** dela.

**A consequência que obrigou a substituir a decisão de 20/08:** a assinatura anterior era um traço de espessura única — uma linha com centro —, e era exatamente isso que permitia *escrevê-la* pela rolagem com `stroke-dashoffset`. Uma display cheia não tem centro para percorrer. O cliente foi avisado disso antes de decidir e optou pelas letras cheias, então a assinatura passou a ser **revelada por varredura da esquerda para a direita**, que numa letra gorda lê como tinta preenchendo.

**2026-08-22 — Entra a seção "Nas redes": galeria em leque de sete cartas, aberta pela rolagem.** Pedido do cliente a partir de referência visual (fanned image cards). Fica **entre o Portfólio e o rodapé** e **acrescenta uma seção às 13** de `site.md` §6, sem reordenar as outras. Fundo claro de propósito: o Portfólio acima é Piche e o rodapé abaixo é a faixa rosa, então esta dobra é o respiro que evita três blocos escuros seguidos. O CTA aponta para Instagram e Mosaico TV; o Instagram continua vazio no `config.js`, então o botão fica desativado até o link chegar, em vez de virar beco sem saída.

**2026-08-22 — GSAP recusado de novo, agora sem conflito.** O pedido do cliente era condicional: "se GSAP e ScrollTrigger já estiverem instalados, prefira utilizar". Não estão, e a decisão de 20/08 que os descartou continua valendo pelos mesmos dois motivos: ~70KB sobre um orçamento de JavaScript já estourado, e o `pin` do ScrollTrigger prende mexendo no DOM. O efeito pedido — leque que abre descendo e fecha subindo, com o progresso da rolagem controlando a abertura — foi entregue com o mesmo mecanismo nativo que a hero já usa, em menos de 3KB.

**2026-08-22 (fim do dia) — O Portfólio vira grade 3x3 de nove peças iguais, em preto e branco.** Pedido do cliente: "9 slots, todos do mesmo tamanho, algo padronizado". **Substitui a decisão de 2026-08-21** que trocara o trilho horizontal pela galeria editorial assimétrica — as classes de tamanho (`--pequeno · --medio · --alto · --largo · --destaque`), o recuo por coluna e o parallax saíram todos.

**O parallax foi removido, não desligado.** Ele dependia de **amplitude diferente por coluna**: com amplitude única a grade se move em bloco e o efeito some. Numa grade uniforme não há como variar sem quebrar a uniformidade pedida, então virou movimento imperceptível e foi retirado. `assets/js/parallax.js` continua no projeto e ainda serve qualquer `[data-sobe]`; hoje não há nenhum.

**Cor:** escolha do cliente entre quatro alternativas apresentadas — **acento em branco** (contorno em Osso, nome em Osso, ano em Cinza) e **card em preto**, mais escuro que o Piche da seção. Isso **substitui `design.md` §7** ("card de portfólio: fundo Grafite sobre Piche") e tira o limão da galeria, que era o único lugar onde ele tinha papel. A seção ficou preto e branco de propósito: quando as fotos chegarem, elas serão a única coisa colorida ali.

**Aviso que foi dado e assumido:** card quase igual ao fundo da seção foi exatamente o que fez a galeria parecer desmontada mais cedo no mesmo dia. Só se sustenta porque o **contorno passou a ser forte** (Osso a .42, contra o fio a .22 de antes) e porque os marcadores foram repintados na mesma cor do card. Rebaixar o contorno ou clarear os marcadores traz o defeito de volta.

**2026-08-22 — O rosa `#f82172` é a cor de ação do site.** Escolha do cliente entre as três cores da identidade nova. Herda o papel que era do Gelo: botão primário no escuro, seleção, ladrilho de lista, hover no rodapé, a palavra em serifada e a faixa do rodapé. **Uma medida obrigou a abrir o papel em dois:** rosa sobre Névoa dá **2.89:1** e reprova o mínimo de 3:1 da WCAG 1.4.11 para elemento de interface (sobre Osso passa raspando, 3.36:1). Então o **anel de foco no claro é Carvão** (15.5:1, a mesma cor do botão primário no claro) e **no escuro é rosa** (5.1:1 sobre Piche). Os dois moram no token novo `--foco`, seguindo a mesma arquitetura de papéis semânticos que `--btn-fundo` já usava. Gelo foi removido de `tokens.css`; sobraram só dois comentários dizendo que ele foi aposentado.

**2026-08-22 — O `h1` da página e os dois CTAs passam a viver no Manifesto.** Fecha a pendência aberta em 19/08, quando a primeira dobra virou só retrato e a página ficou sem `h1`, contra `site.md` §12. A frase do Manifesto **é** o `h1` — não há título oculto duplicando, senão seriam dois títulos de nível 1. Os CTAs entram 1400ms depois, quando a cascata de palavras fecha (18 palavras a 48ms mais a transição de 600ms dão ~1416ms), para não competirem com a frase sendo escrita.

**2026-08-22 — Hero e Manifesto são um capítulo escuro único, e isso virou exceção declarada.** Resolve o conflito aberto em 19/08 com a regra de `design.md` §2 de nunca ter duas seções escuras seguidas. O argumento que sustenta a exceção é concreto: a hero já desemboca em Carvão ao encolher, então a passagem é contínua e não lê como duas seções. Emendado em `design.md` §2. As alternativas — clarear o Manifesto ou fundir as duas dobras — foram descartadas pelo cliente.

**2026-08-22 — A assinatura MOSAICO passa a ser desenhada em SVG, não tipografada.** Resolve a incompatibilidade registrada em 20/08 entre "texto exatamente MOSAICO" e "letras conectadas": nenhuma fonte manuscrita conecta maiúsculas. O traço agora é um `path` único e ininterrupto, então atende aos dois pedidos ao mesmo tempo. **Caveat Brush saiu do projeto** — o projeto volta a duas famílias e três arquivos de fonte (68KB), reconciliando `design.md` §3 e §13 e o descarte de "dupla grotesca+manuscrita" que estava em Decisões rejeitadas.

**2026-08-22 — O retrato v3 fica como está, com três exceções assumidas pelo cliente.** Apontei cada uma antes; ele decidiu manter as três. (a) **É imagem gerada por IA** — o texto do boné tem letras malformadas ("ƐΔPS MOOS") ao lado de uma palavra bem renderizada, o que não é artefato de espelho —, e isso contraria `design.md` §9, que proíbe imagem de IA fingindo trabalho real. (b) **O boné e os óculos escondem o cabelo e o olhar**, então a primeira dobra de uma barbearia não mostra corte nenhum; o cliente optou por tratar a hero como atmosfera, deixando a prova técnica para Platinado e Portfólio. (c) **A foto está espelhada** e fica assim. As três estão escritas em `design.md` §9 para a regra não ficar contradita em silêncio.

**2026-08-22 — O agendamento é pelo ZapCorte, não pelo WhatsApp.** Substitui a decisão "assumida, reversível" de 19/08 em `site.md` §8, que nunca tinha sido confirmada. O cliente já havia ligado `bio.zapcorte.com.br/mosaicoconcept` no card de Serviços; agora vale para todos os CTAs de agendamento. **O curso continua no WhatsApp** (`5511973217359`), que é o canal do próprio card de cursos, e o contato comercial também.

**2026-08-22 — A topografia só existe a partir de 768px.** No celular a página vai de **seis contextos WebGL para um**. Escolhido entre manter tudo (e reescrever a meta de desempenho) e cortar camadas no desktop também; o cliente preferiu preservar o desktop intacto.

**2026-08-22 — As fotos da galeria ficam dentro do card.** Fecha a pergunta aberta em 22/08 sobre reproduzir o transbordo da referência. Sem recorte com alfa, foto retangular de trabalho em cabelo transbordando o card leria como desalinhamento. **Assunto encerrado**, não reabrir.

**2026-08-22 — O áudio do vídeo do Platinado é só música, sem fala.** Confirmado pelo cliente. A `<track>` de legenda fica comentada e o vídeo está conforme `site.md` §12. Pendência encerrada.

**2026-08-22 — Os valores dos cards são reais.** `12x de R$14,47` no Platinado e `3x de R$5,32` nos Cursos. Levantei que os totais (R$173,64 e R$15,96) pareciam baixos e poderiam ser valores de teste do Kiwify; o cliente confirmou que estão certos. Registrado para não voltar à pauta.

**2026-08-22 — A identidade da Mosaico é preto mais três cores: `#c8e739` (verde-amarelado), `#f82172` (rosa) e `#ed2c24` (vermelho).** Instrução do cliente, com a palavra "não saia disso". **Substitui `design.md` §2 inteiro** — a paleta fria de Carvão, Osso, Platina e o acento único Gelo `#7FE7FF` deixam de valer como identidade —, e amplia para o site todo o que antes era exceção restrita ao efeito da hero. As três cores viraram tokens (`--c-limao`, `--c-rosa`, `--c-vermelho`) em `tokens.css`. **Aplicado até agora só na galeria do Portfólio**, que era o que estava sendo trabalhado; o resto do site continua na paleta fria e precisa de uma varredura.

**2026-08-21 — O Portfólio troca o trilho horizontal por uma galeria editorial assimétrica.** Pedido do cliente a partir de uma referência de galeria motorsport. **Substitui** `design.md` §8 padrão 5, `site.md` §6 item 6 e a funcionalidade de "galeria com rolagem horizontal por arraste, teclado e roda" de `site.md` §7. O componente do trilho não foi apagado: `c-trilho`, `track.js` e o CSS continuam inteiros e documentados em `componentes.html`.

**2026-08-21 — Cards de Serviços viram cartões escuros com fundo animado, e cada card inteiro vira link.** Pedido do cliente a partir de um componente React de referência (`@paper-design/shaders-react`), que **não foi instalado**. Duas escolhas dele entre as alternativas apresentadas: o fundo animado é **CSS puro, sem WebGL** — a página já mantém seis contextos e cinco shaders a mais arriscariam derrubar o da hero —, e a âncora envolve o card inteiro em vez de um link "saiba mais" no rodapé. **Substitui `design.md` §7** (card de serviço: fundo Névoa, canto entalhado com etiqueta de preço) na parte da cor, e coloca ilhas escuras dentro de uma seção clara. O entalhe foi mantido: o `clip-path` recorta também a camada animada, então a assinatura de forma da marca continua valendo.

**2026-08-21 — O Platinado troca o comparador antes/depois por um vídeo.** Decisão do cliente. **Substitui** `site.md` §3 (tabela: "Prova de técnica... com antes/depois") e §6 item 4 ("Explicação da técnica, cuidado no processo e antes/depois"), e torna sem efeito o lembrete de pedir um par de fotos de teste que estava em Próximos passos. O componente comparador **não foi apagado**: continua inteiro em `componentes.html`, com CSS e `compare.js`, caso volte a ser usado em outra seção.

**2026-08-20 — A topografia passou a valer também nas seções claras e no entorno da hero, em cinza.** Substitui, por pedido do cliente depois de ver o resultado, a decisão tomada horas antes de restringi-la às seções escuras. Agora são **cinco camadas**: entorno da hero, Manifesto, Platinado, Serviços e Portfólio. O Gelo saiu da paleta — o efeito virou **textura neutra, sem cor de acento**, o que na prática o aproxima mais de `design.md` §2 do que a versão anterior. Como as linhas precisam de contraste contra fundos opostos, há duas paletas: sobre o escuro `#3A3833 · #7C776D · #C9CED6` a 80% de opacidade, e sobre o claro `#C9CED6 · #A8A399 · #6E6A62` a 40%. As seções claras continuam claras: só ganham a textura por cima, sem perder o fundo, então o ritmo de fundos segue intacto.

**2026-08-20 — Topografia animada como fundo das seções escuras, na paleta fria.** O cliente pediu o efeito de curvas de nível "no corpo do site, até a seção de trabalho real" (que é o **Portfólio**). Como toda seção tem `background: var(--fundo)` opaco, um efeito no corpo ficaria escondido; para aparecer, as seções do trecho precisariam ficar transparentes, o que destruiria o ritmo claro/escuro aprovado. Decisão do cliente entre três caminhos: **o efeito entra só nas seções escuras do trecho — Manifesto e Portfólio** —, e as claras (Platinado e Serviços) seguem intactas. Ritmo de fundos preservado, nenhuma exceção aberta. Paleta escolhida: **a fria da marca** — Platina `#C9CED6` nas linhas baixas, Gelo `#7FE7FF` no meio e Osso `#F2EFE9` no alto —, e não o néon da hero, que continua restrito à primeira dobra.

**2026-08-20 — Animação de rolagem da hero feita com `position: sticky` nativo, sem GSAP.** O cliente pediu o efeito do site de referência (hero presa que encolhe conforme a rolagem) e abriu a possibilidade de instalar GSAP. **GSAP foi descartado** por dois motivos concretos: pesaria cerca de 70KB comprimidos sobre um orçamento de JS que já está estourado, e o `pin` do ScrollTrigger prende mexendo no DOM (envolve o alvo e injeta um espaçador), o que contraria o pedido do próprio cliente de "não alterar desnecessariamente o DOM". O `sticky` nativo prende sem tocar no DOM e sem deslocamento de layout, e a animação inteira roda em propriedades que o compositor resolve.

**2026-08-20 — A tinta da hero deixa de ser fixa: passa a ser revelada.** Decisão do cliente depois de ver a versão com a composição sempre visível. A composição de manchas continua existindo, mas como **camada escondida**; o que aparece é só onde o rastro passou. Duas fontes alimentam esse rastro: o cursor, que revela a tinta por onde anda e deixa o rastro esmaecer em alguns segundos, e um **vulto** que assume sozinho depois de 1,6s sem interação e atravessa a dobra devagar, revelando as cores na passagem. A paleta `#c8e739 · #f82172 · #ed2c24` foi aprovada como está e não muda.

**2026-08-20 — O efeito da hero passa a ser tinta neon procedural, escrita à mão em WebGL2.** Substitui o `LiquidEther` (simulação de fluido) adotado mais cedo no mesmo dia: o que o cliente descreveu — manchas de tinta com borda dura, picos, ramificações e respingos sobre preto — não é o que uma simulação de fluido produz. A referência visual foi uma fotografia de parede preta com tinta fluorescente; **nada dela é copiado**, a composição é gerada por metaballs de suporte compacto, deformação de domínio em três camadas e cumes de ruído simplex. React continua, mas o **Three.js saiu**: para um único quad em tela cheia ele não se pagava, e o módulo caiu de 728KB para 205KB (65KB comprimidos).

**2026-08-20 — React, Three.js e etapa de build entram no projeto, para o efeito da hero.** Decisão explícita do cliente, tomada para usar o componente `LiquidEther` (simulação de fluido em WebGL) como fundo da primeira dobra. **Substitui a decisão de stack de `site.md` §10** ("HTML + CSS + JavaScript puro, sem framework, sem etapa de build, zero dependências de terceiros em tempo de execução"), o descarte de React registrado em Decisões rejeitadas, e o orçamento de `site.md` §13 ("JS próprio abaixo de 40KB, zero bibliotecas"). O escopo foi contido de propósito: as 13 seções continuam em HTML estático e o `index.html` segue sendo o arquivo servido; React monta apenas dentro de `#hero-efeito`. Publicar agora exige `npm run build` antes de subir os arquivos — a hospedagem continua estática.

**2026-08-20 — Paleta do efeito da hero: `#c8e739` · `#f82172` · `#ed2c24` · `#ffffff`.** Escolha explícita do cliente. **Substitui** a proibição de "degradê colorido, néon roxo/rosa" de `design.md` §13 e a regra de acento único de §2, e vale apenas para o fluido da primeira dobra — o resto da página continua na paleta fria de carvão, osso, platina e Gelo.

**2026-08-19 — Hero refeita a partir de `referencias/referenciaRetrato.png`: fundo preto e só o retrato.** A primeira dobra passa a ser o retrato recortado (PNG com alpha) sobre fundo Piche, centralizado, contido (`object-fit: contain`) e apoiado na base, começando abaixo do header. O tamanho é regulado por um único token, `--retrato-escala` em `.s-hero` (hoje `.78`, onde `1` seria a altura cheia da dobra). **Sem véu escuro e sem texto sobreposto** — o fundo fica livre para receber efeitos numa próxima etapa. Substitui, por decisão explícita do cliente, três decisões anteriores: `design.md` §8 padrão 1 (retrato full-bleed com texto sobreposto nas colunas 1–6), `design.md` §12 desktop (retrato à direita, texto à esquerda) e `design.md` §12 mobile (texto sobre véu escuro na parte inferior). Da referência foi tomado apenas o tratamento da imagem; a foto e o motivo de linhas orgânicas do fundo não são reaproveitados, conforme `design.md` §0.

**2026-08-19 — Plano de implementação aprovado.** Estrutura, ordem das seções, componentes, interações, estratégia responsiva, desempenho, acessibilidade e ordem de execução em 10 fases. As fases 1 (fundação e tokens) e 2 (biblioteca de componentes) não dependem de nenhuma pendência e podem começar imediatamente.

**2026-08-19 — Ritmo de fundos definido:** claro · **escuro** · claro · claro · **escuro** · claro · claro · **escuro** · claro · claro · claro · **escuro**. A banda cinematográfica da Live Criativo é tratada como mídia sangrada dentro de uma seção clara, e não como seção escura — é assim que a regra de não ter duas escuras seguidas se mantém com a ordem canônica intacta.

**2026-08-19 — O footer é a única exceção à regra de dosagem do Gelo.** Cartão Piche sobre faixa Gelo, como previsto em `design.md` §8. Nenhuma outra dobra pode repetir área ampla de Gelo. Registrado dentro da própria regra, em `design.md` §2.

**2026-08-19 — Mapa como imagem estática, não como iframe.** Imagem otimizada do mapa mais botão "Como chegar" abrindo o aplicativo de mapas em nova aba. Resolve o conflito entre a seção 11 e a regra de zero recursos de terceiros: sem script externo, sem cookie e sem impacto no LCP.

**2026-08-19 — CTA do header entra após 80px de rolagem.** Resolve o conflito com a regra de um único CTA primário por dobra: na primeira dobra manda apenas o CTA do hero. O botão do header aparece por fade junto com o encolhimento do header.

**2026-08-19 — Prova social e FAQ são módulos opcionais.** As duas seções são construídas por completo, mas só vão ao ar se houver conteúdo real — depoimento com autorização de uso e perguntas verdadeiras. Sem conteúdo, não entram na v1 e são acrescentadas depois sem retrabalho. Nenhum depoimento fabricado, em nenhuma hipótese.

**2026-08-19 — Quatro ajustes finos de implementação, dentro das regras já existentes.** (a) Etiqueta sobe de 11px para 12px abaixo de 768px, por legibilidade em caixa alta. (b) Etiqueta de acervo usa Fumaça em fundo claro; Platina fica restrita ao escuro e aos filetes, porque não passa em contraste de texto sobre Osso. (c) No trilho horizontal, apenas o gesto lateral de trackpad avança o carrossel; a rolagem vertical nunca é sequestrada. (d) Sem etapa de build não há minificador: o JavaScript é mantido enxuto na fonte e a compressão fica por conta do Brotli do servidor.

**2026-08-19 — Idioma: português (BR), único.** Sem seletor, sem i18n, sem `hreflang`. Público é local.

**2026-08-19 — Formato: landing page única com âncoras.** Todos os cinco serviços viram seções da mesma página. Escolhido por concentrar a conversão e simplificar a manutenção. Páginas legais ficam fora do fluxo principal.

**2026-08-19 — Stack: HTML + CSS + JavaScript puro, sem framework e sem build.** Sem Tailwind, sem Sass, sem bundler e sem dependências de terceiros em tempo de execução. Publicação em hospedagem estática. Mudança de stack exige autorização explícita.

**2026-08-19 — Público prioritário: cliente jovem de 18 a 30 anos.** Define o tom (autoral e estético), a prioridade mobile e o peso do portfólio. Barbeiros e cabeleireiros são público secundário, atendidos pela seção de cursos.

**2026-08-19 — Tipografia: grotesca + serifada display.** Archivo (variável, 400–800) para display e interface; Instrument Serif para palavras de destaque dentro de títulos e para citações. Ambas livres e autohospedadas. A troca de uma ou duas palavras para a serifada dentro de um mesmo título é a assinatura tipográfica do projeto.

**2026-08-19 — Conceito visual: "oficina de precisão".** Paleta fria de carvão, osso e platina, com um único acento elétrico (Gelo `#7FE7FF`) reservado para ação. Motivo gráfico geométrico de ladrilhos, derivado do nome Mosaico. Detalhe estrutural de assinatura: o canto entalhado dos cards.

**2026-08-19 — A referência é direção, não modelo.** De `referencias/` aproveitamos estrutura, ritmo e atmosfera. Texto, nome, logotipo, imagens, paleta, fontes e elementos exclusivos de marca não são reaproveitados. A identidade final é original e pertence à Mosaico.

**2026-08-19 — Ordem das 13 seções fixada** em `specs/site.md` §6. Reordenar exige aprovação.

**2026-08-19 (assumido, reversível) — CTA primário via WhatsApp.** O cliente não manifestou preferência; adotei o WhatsApp por ser o padrão do mercado brasileiro de barbearia e o de menor atrito. O CTA secundário ("Quero fazer o curso") usa o mesmo canal com mensagem e parâmetro de origem próprios. Trocar por plataforma de agendamento exige apenas substituir o destino dos links. **Aguarda confirmação.**

## Decisões rejeitadas

**2026-08-19 — Site multipágina e LP com páginas internas.** Descartados em favor da página única: diluiriam a conversão e exigiriam volume de conteúdo que ainda não existe.

**2026-08-19 — Astro, Next.js e React (Vite).** Descartados. Para uma landing page estática, o custo de build e de dependências não se paga.

**2026-08-19 — Segundo e terceiro idiomas.** Descartados nesta versão.

**2026-08-19 — Serifada de alto contraste como voz principal e dupla grotesca+manuscrita.** Descartadas: a primeira puxaria para salão de luxo, a segunda exigiria disciplina de aplicação que não se sustenta em página longa.

**2026-08-19 — Estética "old school barber"** (dourado, madeira, tijolo, navalha, poste). Rejeitada explicitamente por contrariar o posicionamento frio e técnico. Listada em `specs/design.md` §13.

## Alterações realizadas

**2026-08-27 (rodada 4) — Detecção de celular trocada de largura para `pointer`, sem tocar no layout da hero.** A rodada 3 (commit `6611835`, revertida em `9f9f8c7`) fez a coisa certa no diagnóstico mas exagerou na execução: além de trocar o gancho, deixou a hero do celular ESTÁTICA (`position: static`, sem `scale`, sem `sticky`), e foi provavelmente isso que "piorou" para o cliente. Esta rodada refaz só a parte segura, com o cliente pedindo explicitamente para **manter os shaders animando, só mais leves**:

- **`src/efeito/TintaNeon.jsx`** — `ehMobile` passou a ser `matchMedia('(pointer: coarse)') || matchMedia('(max-width: 767px)')`. Agora ligam de verdade no aparelho as reduções que já existiam (shader `LEVE`, 30fps, DPR 1, rastro 256, pausa na rolagem). Entrou `TETO_TOQUE = 5e5` — teto duro de pixels do canvas, porque no viewport travado a caixa CSS é ~1280×2775. `escalaMobile` 0,55 → 0,5.
- **`src/efeito/main.jsx`** — topografia passou a montar por `matchMedia('(pointer: fine)')` em vez de `'(min-width: 768px)'`. No celular ela deixa de montar os cinco contextos WebGL, o que **só restaura a decisão de 2026-08-22** (que o bug do viewport travado tinha desfeito).
- **`assets/css/sections.css`** — o bloco de mobile da hero (encolhimento suave de 24%, `border-radius` não animado, marca sem varredura por `clip-path`) passou a valer também em `(pointer: coarse)`. Antes nunca disparava no celular, então `--escala-final` saía ~0,13 e o palco encolhia a 13% com o raio animado repintando o canvas por quadro.
- **NÃO tocado**, de propósito: `hero-scroll.js`, `retrato-3d.js`, o `position: sticky` e o encolhimento da hero, o bloco `@media (prefers-reduced-motion: reduce)`, o leque e o desktop.

**2026-08-27 — Leque de "Nas redes" trocado de rolagem para auto-play na entrada da seção.**

**JavaScript (`assets/js/leque.js`).** Saíram o listener de `scroll`, o de `resize`, o `requestAnimationFrame` e a função `medir()` que convertia a posição do palco em `--abertura`. Entrou um `IntersectionObserver` de disparo único (`threshold: 0.35` sobre o palco) que vira `--abertura` de 0 para 1 e para de observar. Sob movimento reduzido ou sem `IntersectionObserver`, o módulo retorna cedo e o leque nasce aberto pelo padrão do CSS (`design.md` §11).

**A transição precisa ser ARMADA depois de assentar o estado fechado.** O CSS declara `--abertura: 1` (padrão sem JavaScript). O `leque.js` baixa para 0 — e se a transição já estivesse ligada, essa mudança fecharia o leque animado no carregamento. A sequência que resolve: `setProperty("--abertura", "0")` → `void palco.offsetWidth` (reflow que assenta o 0) → `classList.add("is-leque-armado")` → só então o `IntersectionObserver` sobe para 1 e a primeira animação é a abertura. **Vale como regra: para um elemento entrar já no estado final de uma transição, comprometer o estado inicial com um reflow antes de adicionar a regra que tem `transition`.**

**CSS (`assets/css/components.css`).** `--abertura` foi registrada com `@property { syntax: "<number>"; inherits: true }` — sem isso não dá para transicioná-la. A transição (`--abertura 1.5s var(--e-entrada)`) mora em `.c-leque.is-leque-armado`. Todo o resto do encanamento é o mesmo de antes: cada carta lê `--ab` (um `clamp()` sobre `--abertura` e o `--atraso` dela), que recalcula a cada quadro e leva `translate`/`rotate`/`scale` junto. A cascata de dentro para fora, que já existia por causa do `--atraso`, é preservada de graça — agora o motor é a curva da transição em vez da rolagem. Reduced motion também desliga a transição de `.c-leque`.

**2026-08-27 — Tinta da hero aliviada no celular, sem mudar a aparência.** Pedido do cliente depois de testar no aparelho: "está travando um pouco, deixe do mesmo jeito porém mais leve para o celular". Ele escolheu, entre duas profundidades, **só performance** — nada de mexer na composição aprovada em 2026-08-20 (17 manchas, 3 camadas de deformação, cumes de ruído). Só o shader da tinta pesa no celular; a topografia já é desligada abaixo de 768px.

**A causa do engasgo era o auto-ajuste cego.** Ele media `performance.now()` em volta do `drawArrays`, que é tempo de CPU — e `drawArrays` retorna na hora, o trabalho do fragmento (~35 avaliações de ruído simplex 3D por pixel, a 60fps) acontece na GPU depois. Então o custo real nunca entrava na conta e a rede de proteção não disparava. Agora ele mede o **intervalo real entre quadros** (relógio de parede, com guarda de 200ms para aba oculta): passou de 1,5× o alvo por 60 quadros seguidos, a resolução encolhe. **Vale como regra: para detectar jank de GPU, medir o delta entre callbacks de `requestAnimationFrame`, nunca o tempo de CPU em volta da chamada de desenho.**

**Quatro cortes de custo, todos só no celular (`max-width: 767px`), em `src/efeito/TintaNeon.jsx`:** trava de 30fps (`MIN_MS_QUADRO` 32 — a tinta se move devagar, então 30 é indistinguível de 60 e corta metade do trabalho de GPU); DPR de 1,5 → 1,0 (o efeito é borrado e granulado, 1,0 é imperceptível); buffer do rastro de 512 → 256 (`ladoRastro`; é máscara já borrada); escala interna `escalaMobile` 0,6 → 0,55; piso do auto-ajuste 0,42 → 0,36. Combinado, a carga do shader por segundo cai ~6× no celular. Rodado `npm run build` — `assets/efeito/hero-efeito.js` (versionado) reconstruído, 217KB / 69,6KB gzip, sem mudança de tamanho.

**Segunda rodada, no mesmo dia — o celular ainda travava ao rolar.** O cliente autorizou o que fosse preciso ("faça os ajustes necessário para deixar mais leve"). Três medidas:

1. **O shader PARA enquanto o dedo rola** (`aoRolar` em `TintaNeon.jsx`, só no celular). Numa GPU de celular o compositor da rolagem e o shader de tela cheia disputam o mesmo hardware — é a causa direta do engasgo ao descer. Com o `scroll` (passivo), o laço para e o último quadro fica congelado — imperceptível, porque tudo está passando — e volta 180ms depois que a rolagem cessa. `t0` é adiantado pela duração da pausa para a animação não pular; `iniciar()` passou a respeitar a flag `rolando`, senão o `IntersectionObserver` reativava o laço no meio da rolagem. **É o ganho principal e não muda nada visualmente.**

2. **`border-radius` do palco deixou de ser animado no celular** (`sections.css`, media query 767px → `border-radius: 0`). Recalcular o raio por quadro repinta o palco inteiro, canvas incluído. O palco encolhe só 24% e continua cobrindo a tela, então o arredondamento quase não aparecia. `scale` continua animando (é do compositor, é de graça).

3. **Versão barata do fragment shader no celular**, via `#define LEVE` injetado pelo JavaScript (`FRAG_TINTA.replace('precision highp float;', ...)`). Sob `LEVE`: fbm cai de 4 para 3 oitavas (`FBM_OCT`), e saem a terceira deformação de domínio (`w3`, amplitude 0,013), o `campoGotas` (respingos finos) e o segundo cume de ruído (`cume2`). São camadas de detalhe fino que quase não se veem numa tela pequena atrás do grão. **A silhueta, a paleta e o movimento são os mesmos** — mas isto toca de leve a composição aprovada em 2026-08-20, então o cliente foi avisado. Se o recorte da tinta ficar liso demais no aparelho real, o primeiro passo atrás é devolver `FBM_OCT` a 4.

**2026-08-23 — Marca da hero tipografada: MOSAICO CONCEPT em Archivo 800.**

**O corpo mora no BLOCO, não em cada linha.** MOSAICO e CONCEPT são IRMÃOS, então um `em` declarado no CONCEPT é relativo ao PAI e não à palavra ao lado. Foi exatamente o defeito que o cliente pegou: com `font-size: .22em` no CONCEPT e o corpo declarado no MOSAICO, o CONCEPT saiu com **3,52px** (0,22 × os 16px herdados do bloco) — invisível. Com o corpo no bloco, `1em` e `.22em` nas filhas travam a proporção entre elas. **Vale como regra: proporção entre irmãos precisa da referência no pai comum.**

**A correção de eixo foi resolvida por medida, não por dedução.** O espaçamento de `.58em` que sobra depois do T, somado ao tracking negativo do MOSAICO, deixava a tinta do CONCEPT 9,7px à direita do eixo. Eu supus que a margem deslocasse o conteúdo centrado pela METADE do seu valor e errei duas vezes seguidas (21px, depois 8px). Medindo a resposta em dois pontos: **18,9px por `em`**, e a margem que zera é **-0,514em**. Verificado: 0px no desktop, -1px no celular.

**Verificado em 390 e 1280px:** marca dentro do palco nas duas, 65% da largura no desktop e 85% no celular com 30px de folga, varredura respondendo (progresso 0 → 100% cortado; 0,41 → 50%; 0,82 → 0% e para lá), um único `h1`, sem rolagem horizontal e sem erro de console.

**Nota de tamanho:** no celular o CONCEPT fica em 11,6px, e encolhe com a hero até ~8,8px no menor estado. É rótulo de marca, não texto de leitura, então não cai na regra de 16px de `design.md` §13 — mas se ficar pequeno demais na tela real, é subir a proporção de `.22em` numa media query.

**2026-08-22 (fim do dia) — Transição por sobreposição implementada, sem biblioteca.**

**Estrutura.** Um invólucro `.c-sobrepor` com `isolation: isolate` — contexto de empilhamento próprio, então o `z-index` 1 e 2 de dentro não disputam com os 80 a 200 do menu e do CTA flutuante. Dentro dele o Manifesto (`z-index: 1`, sticky) e a faixa de foto (`z-index: 2`, fluxo normal). Quem cobre é a ordem de documento; quem prende é o sticky.

**O defeito que custou o ciclo: `sticky` com `bottom` NÃO PRENDE neste navegador.** A intenção era prender no fim da seção — o usuário lê a frase inteira e só então ela congela —, que é exatamente a semântica de `bottom`. Medido: com `inset-block-end: 0` a borda inferior continua subindo com a rolagem (900 → 720 → 540 → 0); com `inset-block-start: 0` ela trava. **Vale como regra: contar com sticky por `bottom` para prender ao descer não funciona; use `top` com deslocamento.**

**A saída.** `top` recebe deslocamento NEGATIVO igual à sobra (dobra menos altura da seção), calculado em `assets/js/sobrepor.js`. O Manifesto é mais alto que a dobra — só o `<h1>` tem oito linhas a 136px, 938px — então `top: 0` prenderia mostrando o começo e deixaria os CTAs permanentemente abaixo da tela. Com `top: -447px` ele congela mostrando a última dobra, botões à vista, que é o que `bottom` faria. O módulo **não registra listener de rolagem**: só refaz a conta no redimensionamento, porque a altura muda quando o texto reflui.

**Verificado por hit-testing, que é o que prova empilhamento** (`elementFromPoint` no meio da tela, em cinco alturas): em 0% da travessia é manifesto em toda a tela; em 25% a foto ocupa o quinto de baixo; em 50% metade; em 75% quatro quintos; em 100% a tela inteira. A base fica presa (borda inferior travada em 898-900) durante toda a travessia, e o pin **solta exatamente no fim** — depois disso a rolagem segue normal para o Platinado, sem rolagem excedente.

**Defeito no celular, pego na medição: a foto colapsava para 0x0.** `place-content: center` num grid dimensiona a trilha pelo conteúdo, e aí o `width: 100%` da imagem vira referência circular. Trocado por `align-content: center`, que centra só na vertical e deixa a imagem esticada na horizontal. **Vale como regra.**

**A foto é 2:1 numa tela de 1:2.** No desktop ela preenche o painel com `cover` (1280x900, corte lateral discreto). Abaixo de 768px `cover` cortaria quase tudo e sobraria um rosto só, então a caixa passa a ter a proporção da própria foto: ela aparece inteira, centrada no painel escuro — medido em 390px, 390x189 com proporção 2.06 idêntica ao original, **sem corte**. Quem cobre a tela continua sendo o painel, que é o que o efeito precisa.

**Peso.** `images/platinadoconcept.jpeg` (223KB) virou AVIF: 195KB no desktop e 86KB no celular. Está abaixo da dobra e é `loading="lazy"`, então não entra no orçamento da primeira dobra.

**2026-08-22 (fim do dia) — Marca da hero redesenhada: MOSAICO CONCEPT em caixa alta.**

**O desenho.** Traço único, geométrico, cantos vivos e conectores rentes à linha de base. Quatro passadas: o floreio que eu tinha posto sob o `A` virava um sorrisão que engolia o `I` — trocado por **retraço**, que em monolinha é invisível; o `C` fechava demais e lia como `O` — a abertura passou de estreita para 142 unidades de vão; o "AI" colava — separado; e o conector do `I` para o `C` arcava acima da linha de topo — achatado.

**A escrita pela rolagem voltou.** `pathLength="1"` mais `stroke-dasharray: 1` e `stroke-dashoffset: calc(1 - var(--escrita))`. Verificado: progresso 0 → nada; 0.41 → metade; **0.82 → traço completo**, e para lá.

**CONCEPT precisou entrar DENTRO do viewBox.** Primeiro eu o pus como `<p>` ao lado do SVG, com `font-size` em pixels de tela — e ficou **ilegível, com 8px**. O motivo: a hero encolhe até ~0.43 da escala, e CONCEPT só aparece a partir de 72% do progresso, ou seja, exatamente quando a hero está no menor tamanho. Em unidades do viewBox ele escala junto com a palavra e a proporção fica travada em **24% da altura de caixa alta**, em qualquer tamanho. **Regra: elemento que acompanha algo que sofre `scale` deve ser medido no mesmo sistema de coordenadas, não em pixels de tela.**

**Centragem medida, não estimada.** Com `text-anchor="middle"` o centro da tinta caiu 14 unidades à direita do centro da palavra — metade do espaçamento entre letras que sobra depois da última. Corrigido pela medida: desvio de 0 unidades.

**CONCEPT entra depois do traço:** opacidade 0 em 72% do progresso, cheia em 90%. Sob movimento reduzido, traço e CONCEPT aparecem inteiros de uma vez.

**Verificado em 390 e 1280px:** a marca cabe no palco nas duas, 80% da largura no desktop e 86% no celular com 27px de folga de cada lado, nome acessível "Mosaico Concept" no bloco inteiro, sem rolagem horizontal e sem erro de console.

**2026-08-22 — Assinatura redesenhada no caráter da Nighty, em quatro passadas.**

**Como ela é construída.** Não é um contorno único, e não podia ser: o que define a família é o **contraste grosso/fino**, e um traço de espessura única não produz isso. A assinatura é um **grupo** — treze traços de espessuras diferentes (66 nas hastes do M, 50 no V, 42 no s, 56 nas hastes) mais três **anéis por regra evenodd** para o `o`, o bojo do `a` e o `o` final. No anel, a diferença entre as proporções do contorno externo e do olho é o que cria o contraste: externo 74x78 contra olho 28x52 dá lados de 46 e topo/base de 26, quase 2:1.

**O que as quatro passadas corrigiram:** as minúsculas nasceram pequenas demais em relação ao M; depois o "ai" colou e virou um borrão; corrigindo, passei do ponto e a palavra leu "Mosa ico" em duas partes; a quarta acertou o meio-termo. Também engordei o `c`, que ficara fino ao lado dos dois `o`, e alarguei os pés do M, que liam como caroços soltos em vez de serifa em cunha.

**A revelação.** `clip-path: inset(0 calc((1 - var(--escrita)) * 100%) 0 0)`, com a mesma conta de progresso de antes — termina em 82% da pista. Verificado: progresso 0 → 100% cortado; 0.41 → 50%; **0.82 → 0% e para lá**.

**`--escrita` precisou ser registrada com `@property`.** Ela guarda um `min()`, e função aninhada dentro de `calc()` não resolve na multiplicação — o mesmo tropeço já registrado no leque. Registrada como número, o navegador resolve antes da substituição. **Terceira ocorrência da mesma regra.**

**Verificado em 390 e 1280px:** a assinatura cabe dentro do palco nas duas, ocupa 80% da largura no desktop e 86% no celular com 28px de folga de cada lado, sem rolagem horizontal e sem erro de console.

**2026-08-22 — Instagram e TikTok ligados; as três redes ficaram ativas.** `@mosaicooff` nas duas. Os endereços entraram **limpos**: vieram com `igsi` (Instagram) e `_r`/`_t` (TikTok), que são tokens da sessão de compartilhamento de quem enviou — expiram, não servem num link público e carregam contexto de conta que não deve ir para o site. Verificado: os três abrem em nova aba com `rel="noopener"`, nenhum com parâmetro de rastreio, e o estado desativado saiu dos três. Fecha a pendência 12.

**2026-08-22 — Cabeçalho de "Nas redes" centralizado.** Pedido do cliente. Abre exceção em `design.md` §8, que reserva o centro ao Manifesto e ao CTA final, mas com lógica própria: o leque e as três redes já eram composições centradas, então o título à esquerda era o único elemento fora do eixo. Medido em 1280px e em 390px: título, leque e as três palavras com o mesmo centro da página, desvio de 0px. A regra inclui `margin-inline: auto` no lead — ele tem limite de 46ch, e sem as margens automáticas a caixa fica à esquerda e só o texto dentro dela centra.

**2026-08-22 — As três redes viraram palavra pura, com o giro servindo de afordância.**

**O que mudou.** Saíram a pílula, a borda, o sublinhado e a seta ↗ dos CTAs de "Nas redes", a pedido do cliente: sobraram **Instagram · TikTok · Mosaico TV** como três palavras em caixa alta. Os rótulos também encurtaram — "Seguir no Instagram" e "Ver a Mosaico TV" viraram só o nome.

**O giro passou a ser a afordância.** Sem caixa, borda ou sublinhado, nada dizia que as palavras eram clicáveis. O mesmo efeito de rolagem das letras agora dispara **no hover E no foco de teclado**: as faces trocam de lugar de volta, o que é um giro. Não depende de cor (WCAG 1.4.1) e vale para quem navega sem mouse. O alvo de toque de 44px veio do recuo vertical, não da caixa — medido, 75px no desktop e 56px no celular.

**Defeito de acessibilidade que eu tinha introduzido no título, corrigido aqui.** As letras não levavam `aria-hidden`, então um leitor de tela **soletrava** "M-o-s-a-i-c-o" e ainda lia a cópia íntegra do fim — duas vezes e errado. Agora cada letra sai da árvore de acessibilidade e quem carrega o nome é o `.vo`. Verificado: os nomes acessíveis dos três links são "Instagram", "TikTok" e "Mosaico TV".

**Defeito que a captura pegou: "Mosaico TV" saiu grudado.** O link era `inline-flex`, e **em contêiner flex a especificação descarta nós de texto que só contêm espaço** — o espaço entre as duas palavras sumia. Trocado para `inline-block`, que preserva o espaço sem exigir mudança no módulo de rolagem. Medido depois: 203px contra 206px do texto natural. **Vale como regra: texto com espaços não deve ficar sob um pai flex se os espaços importam.**

**Estado desativado.** Instagram e TikTok continuam sem endereço em `config.js`, e sem a estética de botão o único sinal possível é o peso da cor: ficam em 38% de opacidade e `cursor: not-allowed`. Mosaico TV está ligado no `@mosaicotv23`.

**2026-08-22 — TikTok no leque, e o título "Mosaico nas redes" passou a rolar letra a letra.**

**TikTok.** Terceiro CTA em `#redes`, ao lado de Instagram e Mosaico TV. Como `config.js` ainda não tem o endereço, ele nasce desativado — mesmo estado do Instagram —, que é a degradação já prevista: o botão some em vez de virar beco sem saída.

**O efeito de texto foi PORTADO, não instalado.** Chegou como componente React (motion-primitives `TextRoll`) pedindo shadcn, Tailwind, TypeScript, pasta `/components/ui`, alias `@/` e a dependência `motion`. **Nada disso existe aqui** e instalar tudo para animar um título custaria ~30KB sobre um orçamento já estourado. Trouxe a mecânica em `assets/js/rolagem-texto.js` mais CSS: **menos de 2KB**. É a terceira vez que material desse formato chega — o aviso de 21/08 continua valendo e foi seguido.

**Como funciona:** cada letra ganha duas faces sobrepostas em 3D. A de cima começa reta e gira para trás saindo de vista; a de baixo vem deitada e gira até ficar reta. Como as duas mostram a mesma letra, o olho lê um giro no próprio eixo. Uma terceira cópia, invisível, segura a largura — medido: 494px com o efeito contra 493px do texto natural, ou seja, **sem deslocamento de layout**.

**Defeito que a ampliação pegou: 90° exatos deixam um fantasma.** Nesse ângulo a face fica DE PERFIL, não de costas, então `backface-visibility: hidden` não a esconde e ela renderiza como uma linha de 1px atravessando cada letra — um sublinhado fantasma sob o título inteiro. Medido: caixa de 1px de altura, 52px de largura, 15px abaixo do topo da letra. Resolvido levando os ângulos de repouso a **96°**, alguns graus além da perpendicular, onde o verso fica para a frente e a face some de verdade. **Vale como regra para qualquer flip 3D.**

**Cuidados herdados do escrita.js:** o corte percorre os nós de texto, não o `innerHTML`, então as letras dentro de `<em class="serif">` continuam dentro dele (verificado: 8 das 15 estão lá, com a itálica preservada); e os espaços ficam como espaço de verdade, fora da estrutura 3D — embrulhados, impediriam o título de quebrar linha no celular. O texto íntegro volta numa cópia `.vo` para leitor de tela, já que o título picado em letras vira ruído.

**2026-08-22 — Fotos reais no leque, e a saída passou a ser em cascata de dentro para fora.**

**As fotos.** O cliente entregou sete JPEG em `images/FotoM01..07`, todos verticais em **exatamente 3:4** (1179x1570) — a mesma proporção do card, então nada precisou ser recortado. Convertidos para AVIF a 640px de largura (o card mostra no máximo 270px, e 640 cobre tela 2x com folga): **2,1MB viraram 372KB**. Ficam em `assets/img/redes/`. Todas são `loading="lazy"` e a seção está abaixo da dobra, então não entram no orçamento da primeira dobra.

**A ordem é a do leque.** A lista `POSTS` em `leque.js` está da esquerda para a direita, e o item do MEIO é a carta central. **FotoM07 ocupa esse lugar por escolha do cliente.** As duas fotos de família foram postas nas pontas, onde ficam mais encobertas.

**A saída em cascata.** Era o pedido: as fotos começam escondidas atrás da primeira e vão saindo. Cada carta ganhou `--atraso` proporcional à distância do centro (0.1 por passo) e o palco ganhou `--janela` (o que sobra do progresso depois do último atraso). Cada carta calcula a própria abertura, `--ab`, a partir do progresso comum. Em abertura 0 as sete estão exatamente sobrepostas e só a central aparece; depois elas emergem de dentro para fora.

**Dois defeitos que a medição pegou, os dois de sombra:**

(a) **`clamp()` aninhado dentro de `calc()` não resolve na multiplicação.** `--ab` guarda um `clamp()`, e `rgba(..., calc(.3 * var(--ab)))` fazia o alfa cair para zero — a sombra sumia por completo. Resolvido **registrando `--ab` com `@property { syntax: "<number>" }`**: o navegador resolve o clamp antes da substituição e o calc recebe um número comum. Vale como regra geral: variável que guarda função e é consumida dentro de `calc()` precisa ser registrada.

(b) **A sombra não podia estar na lista de transição.** Ela é dirigida pela rolagem e arrastaria 320ms atrás do dedo. Agora o **alfa segue `--ab`** (instantâneo, acompanha a rolagem) e o **tamanho segue `--realce`** (a variável do hover, que É transicionada). Assim a sombra cresce suave no hover sem `box-shadow` transicionar.

**Por que o alfa precisa seguir a abertura:** com as sete cartas empilhadas no início, sete sombras somadas compunham ~0.90 de alfa e viravam um borrão escuro em volta da primeira foto. Com o alfa em zero no fechado, a dobra abre limpa.

**Verificado em 390, 1280 e 1920px:** sete cartas, as sete fotos carregadas, leque dentro da janela, nada transbordando abaixo do palco, sem rolagem horizontal, todo `alt` preenchido e nenhum erro de console.

**2026-08-22 — Galeria em leque implementada (`assets/js/leque.js` + `.c-leque`).**

**Divisão de trabalho.** O módulo não anima nada: monta as cartas a partir de uma lista de dados e escreve `--abertura` de 0 a 1 conforme a seção sobe pela tela. Quem desenha é o CSS. Trocar as fotos é editar a lista `POSTS`, não o HTML — não há uma tag por imagem.

**Geometria no CSS, índices no JavaScript.** O JavaScript escreve por carta só três números sem unidade: `--i` (índice com sinal), `--d` (distância do centro) e `--arco`. Os passos em pixels e graus moram no CSS, e é isso que faz o leque responder a media query **sem uma linha de JavaScript por faixa de tela**. Medido em 1280px: sete cartas de 218x290, de -15° a +15°, espalhadas de -284px a +284px, com o centro erguido 126px.

**O arco levanta o centro, não baixa as pontas.** Ao contrário: com o pivô na base e altura reservada no palco, baixar as laterais as jogaria para fora da caixa. A curva cresce com o quadrado da distância — é isso que dá leque em vez de rampa.

**`translate`/`rotate`/`scale` separados, e não `transform`.** São propriedades independentes, então o leque escreve translate e rotate e o hover escreve scale sem uma apagar a outra. Com `transform` numa linha só, o hover apagaria a rotação e o leque se desmontaria a cada passagem do mouse — que era o risco apontado no próprio pedido. Verificado: com o realce aplicado, rotação e deslocamento ficam idênticos.

**`@property` para transicionar a variável, não a propriedade.** `scale` é dirigida pela rolagem E pelo hover. Pôr transição em `scale` faria o leque arrastar atrás do dedo. `--realce` foi registrada com `@property { syntax: "<number>" }`, então é ela que transiciona: o hover ganha suavidade e translate/rotate/scale continuam colados na rolagem, no mesmo quadro.

**Folga para o giro.** Com o pivô na base, girar 15° joga o canto de baixo para fora da caixa em metade da largura vezes o seno do ângulo — medido, 28px numa carta de 218px. Sem `inset-block-end: calc(var(--carta-w) * .13)` as pontas do leque invadiam os botões logo abaixo.

**Verificado em 390, 768, 1280 e 1920px:** o leque cabe na janela em todas, nada transborda abaixo do palco, sem rolagem horizontal, um único `h1`, nenhum salto de nível de título, toda imagem com `alt` e dimensões, e nenhum erro de console. Criados 7 marcadores 3:4 em `assets/img/redes/`.

**2026-08-22 — Navegação limpa das âncoras mortas.** `#live`, `#cursos`, `#tv` e o `#agendar` do menu apontavam para ids que não existem mais e não levavam a lugar nenhum, o que `site.md` §8 proíbe. Saíram do painel e do rodapé; entrou `#redes`. Conferido depois: **toda âncora interna do documento agora resolve** — as de `#agendar` e `#cursos` que sobraram carregam `data-cta` e são trocadas em tempo de execução pelo ZapCorte e pelo WhatsApp.

**2026-08-22 (fim do dia) — Galeria refeita como grade 3x3, e os pontos de quebra passaram a sair de uma conta.**

**A grade.** Nove `<li>` idênticas, sem classe de tamanho. A uniformidade não vem de altura declarada: vem de **três colunas iguais mais `aspect-ratio: 4/5` na mídia** (a proporção que `design.md` §9 fixa para portfólio), então os nove cards saem do mesmo tamanho sozinhos. Como a altura deixou de ser contada em fileiras de 8px, o `grid-auto-rows` saiu e o **`row-gap` pôde voltar a existir** — ele era zero justamente por causa daquela conta. Medido em 1280px: nove cards de 368x512, em três colunas (x 64, 456, 848) e três linhas (y 306, 841, 1377).

**Os pontos de quebra.** A legenda mede **178px de largura natural** e pede 24px de recuo de cada lado, então o card não pode ter menos de ~226px. Descontando margem lateral e vãos: três colunas precisam de ~806px de janela e duas precisam de ~516px. Por isso **3 colunas só a partir de 1024px, 2 a partir de 560px e 1 abaixo disso** — em 768px, três colunas dariam 213px de card. O tablet ficar em duas colunas não é preguiça: é a conta.

**O defeito que quase passou.** Quando a faixa aperta, a legenda **não transborda: ela quebra em duas linhas** dentro de uma faixa de 52px, em silêncio. Meu primeiro teste dava "ok" porque só media se o texto começava depois do degrau. Peguei comparando a **largura natural** do conteúdo (clonando a legenda fora do fluxo) com a caixa disponível: 178px contra 140px. Acrescentado `white-space: nowrap` nos dois spans, para que um aperto futuro transborde de forma visível em vez de quebrar escondido. **Vale como método: medir largura natural contra caixa disponível, não só posição.**

**Verificado em 390, 768, 1024, 1280 e 1920px:** nove cards do mesmo tamanho em cada largura, nenhuma legenda espremida, nenhuma cortada, zero sobreposições, sem rolagem horizontal e sem erro de console.

**Marcadores.** Os 18 SVGs (nove pares) foram repintados em preto puro, com a grade a 5% e um traço curto em Osso. Entrou o par `obra-09`, que não existia.

**2026-08-22 — Cards de Serviço e marcadores do Portfólio postos na paleta.**

**Serviço.** As três manchas do fundo animado passaram de dois Gelos mais uma Platina para **uma mancha por cor da identidade** — limão a .26, rosa a .22, vermelho a .16 —, e o hover da borda passou de Platina para rosa. Alfas escolhidos pelo piso de contraste: as três empilhadas no pico compõem `rgb(123,57,41)` sobre Piche, e Osso sobre isso rende **7.4:1**. Subir os alfas come essa folga. **`background-blend-mode: screen` foi testado e descartado**: adiciona névoa e clareia o preto sem tornar as matizes mais legíveis.

**Marcadores.** Os 16 SVGs do portfólio foram reescritos: o fundo passou de `#1B1917`/`#141311` para **Grafite `#2A2825`**, o mesmo do corpo do card, então a emenda entre a foto pendente e a faixa da legenda deixou de aparecer como degrau de cor. A grade ficou mais discreta (alfa .10 → .055) e cada marcador ganhou um traço curto em limão. Antes o marcador era mais claro que tudo em volta e dominava o card, o que fazia a galeria parecer desmontada mesmo depois de o layout estar certo.

**2026-08-22 — Retrato da hero: 1,8MB viraram 117KB, e a máscara saiu.**

**Formato.** Não há `cwebp`, `avifenc` nem ImageMagick nesta máquina, mas **`sips` escreve AVIF nativamente** (`sips -s format avif -s formatOptions Q`) — rota nova, vale reaproveitar. Saíram `assets/img/hero/retrato-desktop.avif` (1536x1024, **117KB**) e `retrato-mobile.avif` (900x600, **49KB**), com o PNG só como rede de segurança no `<picture>`. Como todo navegador da matriz de `site.md` §10 lê AVIF, na prática ninguém baixa o PNG.

**Como a qualidade foi escolhida.** Medindo PSNR contra o original, decodificando o PNG à mão em Python (não há Pillow). A curva **satura em ~37 dB** mesmo em qualidade 95: q45 33.3 · q55 34.4 · q70 35.5 · **q80 36.1** · q88 36.6 · q95 37.0. Separando o erro, a borda do alfa sai **mais limpa** (41.8 dB) que o miolo (36.8 dB), com viés de escurecimento de 0.8/255 — assinatura de **grão de filme sendo suavizado**, não de detalhe perdido. Por isso q80: acima disso se paga banda por grão que o CSS já repõe com a própria camada de grão.

**Máscara removida.** A máscara radial em `.s-hero__foto img` existia só para dissolver a moldura retangular da foto antiga, que não tinha alfa. O v3 é recortado de verdade (medido: alfa binário, 57.8% transparente e 42% opaco, sem meio-termo), então a máscara passaria a comer ombro e borda do recorte. A penumbra ficou, mas deixou de ser remendo: agora é a sombra que apoia a figura. O filtro `brightness(.84) contrast(1.08) saturate(.88)` também ficou — a foto é iluminada sobre fundo claro e sem ele o retrato lê mais claro que a cena.

**Resultado medido na primeira dobra**, somando retrato, as duas fontes pré-carregadas, os cinco CSS e o bundle do efeito: **435KB no desktop e 369KB no celular**, crus. O teto de `site.md` §13 é 600KB — antes desta rodada o retrato sozinho colocava a conta em ~2,1MB. A dobra voltou a caber no orçamento mesmo com o bundle de React ainda estourando o limite de JavaScript.

**Defeito corrigido de passagem:** o HTML pedia `images/RetratoV3.png` e o arquivo é `Retratov3.png`. No macOS funciona porque o sistema de arquivos ignora maiúsculas; em qualquer host Linux seria 404 e a hero ficaria sem retrato. A imagem também saiu de `images/` na raiz e foi para `assets/img/hero/`. Acrescentado `<link rel="preload" as="image">` por faixa, como `site.md` §13 pede para o LCP.

**2026-08-22 — Varredura do Gelo para o rosa, e o rodapé passou a usar tokens.** Eram só **18 ocorrências reais** — a arquitetura de tokens estava limpa, então o alcance foi menor do que parecia. `--c-gelo` saiu de `tokens.css`; `--btn-fundo` no escuro virou rosa; foco, seleção, ladrilho da lista de curso, hover do rodapé, os dois `.serif` de destaque e a faixa do rodapé acompanharam.

**O que a varredura revelou:** o cartão do rodapé (`.c-fecho`) pintava `background: var(--c-piche); color: var(--c-osso)` na unha, sem virar os papéis semânticos. Por isso o botão primário lá dentro precisava de `style="background:...;color:..."` inline — e por isso ele não acompanhava troca de paleta. Corrigido pondo `t-escuro t-profundo` na classe do cartão e deixando `.c-fecho` ler `var(--fundo)`/`var(--texto)`: **quatro estilos inline sumiram** e o botão passou a herdar rosa sozinho. Regra que fica: superfície escura dentro de seção clara vira papel semântico, não cor crua.

**2026-08-22 — Assinatura MOSAICO desenhada à mão em SVG.** Um `path` único, sem levantar a caneta, em `viewBox 0 0 1280 320`. **Seis versões até ler.** O que não funcionou e por quê: com todas as letras em laços de mesma altura no meio da linha, o traço vira cursiva genérica e lê "Maraisa"; conectores longos em altura de caixa alta fabricam laços que leem como "e"; e o `C` fecha e vira espiral se o terminal de cima se enrola para dentro. O que resolveu foi **altura de caixa alta com conectores rentes à linha de base**, o `A` com travessa de verdade saindo por um floreio **por baixo** da letra (em vez de cortar o miolo dela), e o `C` entrado por um floreio inferior com abertura larga.

**A escrita pela rolagem ficou mais precisa que antes.** `pathLength="1"` normaliza o comprimento do traço, então `stroke-dasharray: 1` e `stroke-dashoffset: calc(1 - var(--escrita))` desenham a assinatura sem medir nada em JavaScript. Substitui a máscara de degradê linear, que só varria uma faixa reta e não acompanhava a curva do traço. Verificado injetando o progresso: 0 → nada; 0.41 → metade; **0.82 → traço completo**, e para lá, que é exatamente o que a conta pedia.

**2026-08-22 — Alvo de toque do rodapé corrigido de 32px para 44px.** Achado na varredura de 390px, e anterior a esta rodada: os dez links das colunas do rodapé tinham `min-height: 32px`, contra o mínimo de 44x44 que `site.md` §11 e §12 exigem. Corrigido com `inline-flex` mais centro vertical — só declarar a altura deixaria o texto colado no topo da caixa. Verificado depois: nenhum alvo abaixo de 44px em 390px.

**2026-08-22 — `data-wa` virou `data-cta`, e cada origem ganhou canal próprio.** O atributo não significa mais "WhatsApp" e sim a origem do clique. `config.js` ganhou um mapa `destinos`: origem com destino próprio manda, senão cai no WhatsApp, senão vai para a âncora interna — a degradação elegante original ficou intacta. Preenchidos o número (`5511973217359`), o ZapCorte em `destinos.agendar` e o YouTube (`@mosaicotv23`) nas redes. Verificado no navegador: 5 CTAs de agendar no ZapCorte, 2 de curso e 1 de parceria no WhatsApp com mensagem pronta, Instagram e TikTok corretamente desativados.

**2026-08-22 — Card da galeria refeito conforme a captura em `referencias/`, e parallax de rolagem.**

**Card em L.** O entalhe passou do canto inferior direito para um **degrau no inferior esquerdo**, com a legenda na faixa à direita, alinhada à direita — nome em Osso, ano em Gelo. O contorno de 1px acompanha o L inteiro, degrau incluído, feito com **duas camadas recortadas pela mesma silhueta**: a de fora pintada com Grafite, a de dentro recuada 1px com Piche. `border` não serviria aqui, porque o recorte cortaria a borda e deixaria as arestas do degrau sem traço. O `border-radius` continua valendo junto do `clip-path` — a área pintada é a interseção dos dois, então os cantos externos ficam arredondados e só o degrau tem quina viva. No hover a camada externa vira Gelo, o que acende o contorno inteiro.

**Parallax.** `assets/js/parallax.js` escreve `--sobe` em cada `[data-sobe]` a partir da posição do elemento na tela; o CSS aplica `translate3d`. A amplitude é **diferente por coluna** (14, 8 e 18px de pico) — com amplitude única a grade se moveria em bloco e o efeito sumiria. Só calcula o que está na tela, via `IntersectionObserver`, e roda num `requestAnimationFrame` disparado por listener passivo. Medido: pico de **5.6%** da altura do card, dentro do teto de 8% de `design.md` §11. Desligado abaixo de 768px e sob `prefers-reduced-motion`, conforme §12.

**O que da referência NÃO foi copiado:** lá as imagens transbordam para fora do topo do card. Aquilo funciona porque são capacetes recortados, com fundo transparente, flutuando sobre o card. O acervo da Mosaico é fotografia de trabalho em cabelo: uma foto retangular transbordando o card leria como desalinhamento, não como composição. **Aguarda decisão** se o cliente quiser recortes com alfa para reproduzir esse detalhe.

**2026-08-21 — Galeria editorial do portfólio implementada, em CSS puro.** Grid de 3 colunas com `grid-auto-rows: 8px`: a altura de cada card vem do número de fileiras que ele ocupa, escolhido por uma **classe de tamanho** (`--pequeno · --medio · --alto · --largo · --destaque`), mais `--desloca` para empurrar um card e quebrar o alinhamento do topo. Nada é sorteado — acrescentar um projeto é duplicar um `<li>` e escolher a classe. Medido em 1280px: larguras de 368 e 623px, alturas de 272 a 496px, oito começos em alturas diferentes.

**Detalhe que a conta exigiu:** `row-gap` é **zero** e o respiro vertical vem da margem do card. Com `row-gap` aceso, cada fileira de 8px somaria uma calha e a altura do card deixaria de ser `fileiras x 8px` — a composição viraria adivinhação.

**Reveal:** cada card tem duas imagens sobrepostas. A principal é varrida por uma diagonal em `clip-path` (`polygon(0 0, 100% 0, 100% -45%, 0 0)`) em 760ms, enquanto a secundária assenta de `scale(1.08)` para `scale(1)` em 820ms — é o desencontro entre as duas escalas que dá profundidade. Tudo dentro de `@media (hover: hover)`, então no toque não acontece nada e a imagem principal fica. Desligado em `prefers-reduced-motion`.

**Responsivo:** 3 colunas no desktop, 2 no tablet (onde os cards de 2 colunas voltam a 1, senão viram faixas de ponta a ponta) e 1 no celular, onde as alturas se igualam — em coluna única a variação vira só rolagem, sem composição. Verificado em 1280, 768 e 390px, sem rolagem horizontal em nenhum.

**2026-08-21 — Degradê nas emendas, corrigido depois para valer só entre tons próximos, e cursor removido da topografia.**

(a) **Emendas.** A primeira versão pôs uma faixa em quatro emendas, cada uma com a cor da seção anterior desmanchando na própria. **Ficou ruim e foi revertida em três delas**, a pedido do cliente. O motivo é aritmético: entre Carvão e Osso são **204 pontos de luminância**, e um degradê nessa distância não vira passagem, vira mancha escura entrando na seção clara. A borda dura ali é o comportamento certo — é a alternância que marca os capítulos, conforme `design.md` §2. **Sobrou uma só:** Osso → Névoa, na entrada de Serviços, onde a diferença é de 11 pontos e o degradê realmente some. Regra: degradê de fundo só entre tons vizinhos; entre claro e escuro, corte seco.

**Cuidado que continua valendo:** os dois pontos do degradê usam o MESMO RGB, mudando só o alfa. Terminar em `transparent` — que é preto com alfa 0 — sujaria o meio da passagem.

(b) **Cursor fora da topografia.** `mouseInteraction={false}` em `main.jsx`, e o componente passou a **não registrar** o listener de `mousemove` quando a interação está desligada, em vez de registrar e ignorar. A tinta da hero e a inclinação 3D do retrato continuam respondendo ao cursor; só o fundo de curvas deixou de responder.

**2026-08-21 — A topografia passou a ser um campo único, contínuo entre as seções.** Antes cada camada amostrava o campo em coordenadas da própria tela, com origem e tempo próprios: as curvas eram cortadas na emenda e recomeçavam com outro desenho. Agora o shader recebe três uniformes novos — `uMundoOrigem` (canto superior esquerdo da tela em px CSS do documento), `uMundoEscala` (1400px por volta do campo) e `uCssPorPixel` — e amostra em **coordenadas de documento**, então todas as camadas desenham pedaços do mesmo campo. Como `bez()` é periódico em 1, o campo se repete a cada 2800px de rolagem, sem costura visível.

**Dois cuidados que a continuidade exigiu:** (a) a origem é lida **a cada quadro**, e não uma vez na montagem, porque a camada do entorno da hero é `sticky` e se move dentro do documento enquanto está presa — fixando a origem, o campo dela descolaria do das outras; (b) o tempo passou a vir de uma constante de módulo compartilhada (`T_INICIO`) em vez de um `performance.now()` por instância, senão a defasagem entre montagens desalinharia as emendas.

**Como foi verificado:** comparando a última fileira de pixels de uma seção com a primeira da seguinte, pelo canal alfa (que independe da paleta) e por vizinho mais próximo, para tolerar uma linha tangente que apareça de um lado só. Resultado nas três emendas: manifesto→platinado 12/12 linhas a 0.3px, platinado→serviços 3/3 a 1.3px, serviços→portfólio 7/7 a 2.7px, num buffer de 1536px. Comparar por índice em vez de vizinho mais próximo dá falso negativo quando as contagens diferem.

**2026-08-21 — Vídeo real do Platinado no ar.** O arquivo entregue é **H.264 + AAC em MP4**, então não precisou de conversão nenhuma — toca em todo navegador (`canPlayType` responde "probably"). Medido lendo as caixas do MP4: **576x1024**, 56,4s, 5.67MB a 843 kbps. Está em `assets/video/platinado/platinado.mp4`. O poster foi extraído do próprio vídeo aos 22s e salvo como `assets/img/platinado/capa-video.jpg` (68KB); o marcador SVG anterior foi apagado.

**Rota para extrair quadro sem ffmpeg:** não há ffmpeg nesta máquina e a ponte JXA para AVFoundation não funciona. O que funcionou foi combinar dois utilitários nativos: `avconvert --start N --duration 0.4` recorta um trecho curto a partir do segundo desejado, e `qlmanage -t` gera a miniatura do primeiro quadro desse trecho. Reaproveitar essa rota se precisar de outro quadro.

**2026-08-21 — Vídeo do Platinado montado, pronto para receber o arquivo.** `<video class="s-platinado__video">` com `controls`, `playsinline`, `poster` e duas `<source>` (WebM antes de MP4). `preload="none"` cumpre `site.md` §13 — verificado que nenhum `.mp4`/`.webm` é buscado antes do play, então os arquivos ausentes não geram 404. `aspect-ratio: 16/9` mais `width`/`height` declarados reservam a caixa e evitam salto no carregamento; raio `--r-lg`, como manda `design.md` §7 para card de mídia. Criados `assets/video/platinado/` com um LEIA-ME explicando o que trocar, e o marcador de poster `assets/img/platinado/capa-video.svg` no mesmo padrão dos outros. A `<track>` de legenda está no HTML comentada, para descomentar se houver fala (`site.md` §12).

**2026-08-20 — A frase do Manifesto passou a ser escrita palavra a palavra, e ficou centralizada.** `assets/js/escrita.js` envolve cada palavra em duas camadas — uma externa com `overflow: hidden` e uma interna que sobe de `translateY(115%)` — e dispara a cascata por `IntersectionObserver` a 25% de visibilidade, uma única vez, com 48ms de defasagem entre palavras (18 passos, ~1.4s no total). O corte é feito **percorrendo os nós de texto**, e não pelo `innerHTML`: assim as palavras dentro de `<em class="serif">` continuam dentro dele e os espaços originais são preservados. Verificado que o texto integral e os dois `<em>` saíram intactos. A frase saiu do sistema `revelar`, que a faria entrar inteira de uma vez, e ganhou `text-align: center` — que `design.md` §8 já previa para o Manifesto e não estava aplicado.

**Cuidado que a medição pegou:** o ponto final depois de `</em>` é um nó de texto separado, então virava uma "palavra" própria e subia 48ms depois de CADEIRA. Pontuação solta agora **herda o índice da palavra anterior** e sobe junto. Movê-la para dentro do `<em>` resolveria também, mas ela herdaria a cor de destaque.

**2026-08-20 — A assinatura MOSAICO passou a ser escrita pela rolagem.** A pedido do cliente ela deixa de existir na hero em tela cheia e é revelada da esquerda para a direita conforme a hero encolhe, no mesmo progresso. Feito com máscara em `linear-gradient(96deg, ...)` cuja ponta é `calc(var(--escrita) * 118% - 9%)`: em progresso 0 a ponta fica em -9% e nada aparece; a faixa de 9% de degradê é a "ponta da caneta", e o ângulo de 96° acompanha a inclinação da palavra. `--escrita` é `min(1, var(--progresso) / .82)`, então o traço termina em 82% da pista e a assinatura fica pronta e parada antes do fim da animação. Sob `prefers-reduced-motion` o progresso nunca sai de 0, então a media query desliga a máscara e a palavra aparece inteira — sem isso ela ficaria invisível para sempre.

**2026-08-20 — Assinatura MOSAICO por cima da hero.** `<p class="s-hero__marca">` dentro de `.s-hero__palco`, em `z-index: 4` — acima do retrato (1), do grão (2) e do véu de afastamento (3) — com `pointer-events: none` para não roubar o cursor da tinta. Por viver dentro do palco, ela **encolhe junto com a hero na rolagem sem código extra**: medido, ocupa 77% da largura do palco tanto em tela cheia quanto no fim da animação. Cor `#f82172`. Tamanho `clamp(4.5rem, 23vw, 26rem)` no desktop e `clamp(3rem, 24vw, 7rem)` abaixo de 768px, onde ocupa 80% da largura com 40px de folga de cada lado.

**2026-08-20 — Entrou uma terceira família tipográfica, restrita à assinatura.** Caveat Brush (licença SIL OFL), baixada do Google Fonts e auto-hospedada. **Contraria `design.md` §3 e §13** (duas famílias) e o descarte de "dupla grotesca+manuscrita" registrado em Decisões rejeitadas; o cliente instruiu o remédio no próprio pedido. O custo foi contido pedindo ao Google Fonts o **subconjunto só dos seis glifos da palavra** (M, O, S, A, I, C) em vez do latino completo: **5.2KB em vez de 52KB**. São quatro arquivos de fonte agora, dentro do teto de cinco de `site.md` §13, e 76KB no total.

**2026-08-20 — Topografia recalibrada para sussurro, e o entorno da hero amarrado à rolagem.** A primeira versão gritava: linhas com pico de luminância 119 sobre fundo 19, com halo largo (`glow` 0.5), o que fazia o efeito ler como desenho por cima do material em vez de relevo dele. Duas correções, a pedido do cliente e tendo a referência como alvo. (a) **Paletas rebaixadas** para poucos pontos acima (ou abaixo) do fundo: no escuro `#1A1815 · #2E2A25 · #474239`, no claro `#D8D4CB · #C6C1B7 · #AEA99E`, com `glow` de 0.5 para **0.15**. Medido compondo sobre o fundo real: no escuro a linha média fica em 28 e o pico em 58, contra fundo 19; no claro, média 212 contra fundo 223. (b) **A camada do entorno da hero recebeu `opacity: var(--progresso)`**: com a hero em tela cheia ela não existe, e surge exatamente conforme a hero encolhe — que era o comportamento pedido.

**2026-08-20 — Topografia implementada, sem a dependência `ogl`.** O componente de origem usava `ogl` (`Renderer`, `Program`, `Mesh`, `Triangle`); o shader foi portado para o mesmo encanamento WebGL2 escrito à mão da tinta da hero, então **nenhuma dependência nova entrou**. Arquivos: `src/efeito/topografiaShaders.js` (o fragmento é o original, sem alteração de lógica) e `src/efeito/Topografia.jsx`. O `main.jsx` monta uma instância em cada `[data-topografia]`, que existe dentro de `#manifesto` e `#portfolio`. Cada instância pausa por `IntersectionObserver` e por aba oculta, então no máximo uma ou duas rodam por vez. A camada é `pointer-events: none` e o cursor é lido na janela, para o conteúdo da seção continuar clicável. O bundle subiu de 207KB para 215KB (69KB comprimidos). Medido no Manifesto: linhas fortes em **2.32%** da área e halo em 1.6%, o que mantém o Gelo abaixo do teto de ~5% por dobra de `design.md` §2.

**2026-08-20 — O tamanho final da hero passou a ser um alvo em pixels: 550x350.** Antes era uma fração fixa da janela. Agora `hero-scroll.js` calcula `--escala-final` como `min(550 / larguraDaJanela, 350 / alturaDaJanela)` e reescreve a cada redimensionamento; o CSS interpola de 1 até esse valor. Como a escala é **uniforme** — não uniforme esticaria o retrato e a tinta —, o palco **cabe dentro** de 550x350: a dimensão que aperta primeiro crava o alvo e a outra fica igual ou menor. Em 1280x800 dá 550x344 (largura crava); em 1000x900 dá 389x350 (altura crava). O raio agora é dividido pela escala, para o arredondamento visto na tela ficar constante em ~44px em vez de encolher junto com o palco. **No celular o alvo não se aplica**: em 390x844 ele produziria uma tira de 162x350, então a media query mantém a escala proporcional de 0.76 (296x641).

**Cuidado que custou um ciclo:** a reserva `--escala-final` estava declarada dentro de `.s-hero__palco`, e declaração local vence valor herdado — o valor que o JavaScript escrevia na pista nunca chegava. A reserva tem de ficar na pista, no mesmo elemento em que o JavaScript escreve.

**2026-08-20 — A hero passou a encolher mais na rolagem, a pedido do cliente.** Escala final de 0.8 para **0.64** no desktop e de 0.86 para **0.76** no celular. O raio ganhou um fator 1.4 (`--r-xl * 1.4`) porque o próprio elemento encolhe: 67px em escala 0.64 dão ~43px na tela, que é o arredondamento que se quer ver — sem esse fator o card ficaria com o canto mais reto justamente quando está menor. O véu de afastamento subiu de 0.22 para 0.28, acompanhando a distância maior.

**2026-08-20 — Hero presa que encolhe com a rolagem.** A `section.s-hero` virou **pista**: mede uma dobra mais `--hero-pista` (100svh no desktop, 62svh no celular). Dentro dela entrou `.s-hero__palco`, que é o que fica preso (`position: sticky; top: 0; height: 100svh`) e encolhe. O `overflow: hidden` mudou da section para o palco, porque overflow diferente de `visible` num ancestral quebra o sticky. `assets/js/hero-scroll.js` não anima nada: só mede a pista e escreve `--progresso` de 0 a 1, num `requestAnimationFrame` disparado por um listener passivo de rolagem; o CSS lê essa variável em `scale`, `border-radius` e na opacidade do véu de afastamento. Por ser progresso puro, a animação acompanha a rolagem nos dois sentidos e para junto quando a rolagem para. Escala de 1 a **0.8** no desktop e a 0.86 no celular; raio de 0 a 48px. O grão saiu de `.s-hero::after` para `.s-hero__palco::after`, para encolher junto. Conteúdo da hero, quando existir, entra a partir de `z-index: 4`.

**2026-08-20 — A hero perdeu a classe `t-profundo`.** O fundo da pista passou de Piche para **Carvão**, a mesma cor do Manifesto, para que o que aparece em volta do palco ao encolher seja literalmente a cor da próxima seção. O interior do palco continua preto puro, vindo de `.s-hero__efeito`. Verificado: pista e Manifesto medem os dois `rgb(20, 19, 17)`.

**2026-08-20 — `retrato-3d.js` passou a normalizar o cursor pelo palco.** Antes usava `[data-hero]`, que agora mede duas dobras e jogaria a inclinação para fora de escala.

**2026-08-20 — Pincel do vulto reduzido, a pedido do cliente.** `RAIO_VULTO` de 0.16 para **0.095** em `src/efeito/TintaNeon.jsx`: a revelação automática deixa de ser uma faixa larga e vira um foco compacto de cor atravessando a dobra. A área revelada num instante caiu de cerca de 11% para **5%** da tela. `RAIO_CURSOR` continua em 0.105 — o pincel do mouse não foi alterado.

**2026-08-20 — O vulto passou a ter trajetória fixa em zigue-zague, a pedido do cliente.** Substitui a perseguição de alvos sorteados: agora ele anda em linha reta e **reflete ao bater nas paredes**, como bola de bilhar. Constantes em `src/efeito/TintaNeon.jsx`: `MARGEM_X` 0.02 e `MARGEM_Y` 0.04 (o quanto ele encosta na borda antes de voltar) e `INCLINACAO` 0.42, a razão vy/vx que define quanto cada ida atravessa a dobra descendo ou subindo. A varredura passa a cobrir a tela inteira sem depender de sorteio, e o percurso é sempre o mesmo. Verificado ao longo de 15s: seis reflexões, batendo em x=0.02 e x=0.98 nas laterais e em y=0.04 e y=0.96 no teto e no chão.

**2026-08-20 — Tinta da hero acelerada, a pedido do cliente.** Três números em `src/efeito/TintaNeon.jsx`: `VEL_VULTO` de 0.17 para **0.30** uv/s (o vulto atravessa a dobra em ~3s em vez de ~6s); o decaimento do rastro de 0.988 para **0.972** (a tinta some em ~2s em vez de ~5s); e a queda da força do cursor de 0.9 para **0.82** por quadro, para o rastro soltar assim que o ponteiro para. O carimbo continua sendo aplicado ao longo do segmento entre um quadro e o outro, então o rastro não picota com o vulto mais rápido — verificado.

**2026-08-20 — Micro efeito 3D no retrato da hero.** `assets/js/retrato-3d.js`, módulo nativo ligado no `main.js` — fica **fora do build do Vite**, que existe só para a tinta. O retrato inclina alguns graus e desliza poucos pixels seguindo o ponteiro, e a **sombra anda no sentido contrário**, a 42% da amplitude: é o desencontro entre as duas camadas que dá profundidade, mais do que a inclinação sozinha. O JavaScript só escreve quatro propriedades customizadas (`--giro-x`, `--giro-y`, `--desloc-x`, `--desloc-y`) em `.s-hero__foto`; toda a composição do transform mora no CSS, e em repouso as quatro valem zero. Amplitudes em `retrato-3d.js`: `GIRO_MAX` 2.6°, `DESLOC_MAX` 9px, `SUAVIDADE` 0.09. O deslocamento equivale a ~1.6% da altura do retrato, bem abaixo do teto de 8% de `design.md` §11; desligado abaixo de 768px e sob `prefers-reduced-motion`, conforme §12. O laço encerra sozinho quando chega ao alvo, em vez de girar à toa.

**2026-08-20 — A perspectiva ficou no elemento pai, não na função `transform`.** O ponto de fuga de `perspective()` é o `transform-origin`, e o do retrato é a base (para a escala continuar apoiada no chão): a fuga sairia por baixo dos pés. Com `perspective` e `perspective-origin: 50% 42%` em `.s-hero__foto`, a fuga fica na altura do rosto. Em repouso o transform continua sendo um `scale` 2D limpo, sem distorção e sem CLS.

**2026-08-20 — Retrato integrado à cena da hero.** Estava com cara de colagem por dois motivos: o retângulo de fundo preto da foto recortava a tinta em volta dele, e o retrato era mais claro e mais contrastado que tudo na dobra. Três camadas resolveram, todas em `sections.css`: (a) uma **penumbra** em `.s-hero__foto::before`, com `z-index: -1` para ficar atrás da foto e não escurecer o rosto — a tinta mergulha no escuro à medida que se aproxima e a emenda vira sombra; (b) uma **máscara radial** na imagem, que dissolve a moldura retangular, mais `brightness(.84) contrast(1.08) saturate(.88)` para casar o tom; (c) um **grão fino** em `.s-hero::after`, acima do retrato, já que o shader põe grão na tinta e a foto não tinha nenhum — com ele os dois materiais parecem a mesma imagem. Há uma media query abaixo de 768px porque a foto, sendo paisagem e apoiada na base, vira uma faixa baixa no celular e a sombra precisa descer junto. Conteúdo da hero, quando existir, entra a partir de `z-index: 3`.

**2026-08-20 — Modos de mesclagem foram testados e descartados.** `mix-blend-mode: screen` e `lighten` na foto resolveriam o retângulo de graça, mas a tinta é mais clara que a pele e invadia o rosto — inaceitável, já que o rosto e o corte são o produto. Registrado para não se tentar de novo.

**2026-08-20 — Tinta neon implementada.** `src/efeito/TintaNeon.jsx` (plumbing WebGL2, rastro em ping-pong de 256×256, resolução adaptativa, pausa por `IntersectionObserver` e por aba oculta) e `src/efeito/tintaShaders.js` (GLSL). O `main.jsx` monta o novo componente. Os arquivos do `LiquidEther` ficaram em `src/efeito/` sem uso, caso seja preciso voltar atrás — como ninguém os importa, não entram no build. Verificado em 1280×800 e 390×844: manchas orgânicas e assimétricas, mistura das três cores, animação evoluindo ao longo do tempo, cursor deformando e engrossando a tinta no caminho por onde passa, sem rolagem horizontal e sem erro de console.

**2026-08-20 — Efeito da hero implementado.** `package.json`, `vite.config.js` e `src/efeito/` (`LiquidEther.jsx`, `LiquidEther.css`, `main.jsx`) entram no projeto; o build sai em `assets/efeito/hero-efeito.js` e `.css`, ligados no `index.html`. A camada do fluido fica em `z-index: 0` e o retrato em `z-index: 1`, com `pointer-events: none` no retrato para o mouse atravessar. O `main.jsx` não monta nada quando o sistema pede `prefers-reduced-motion: reduce` ou quando não há WebGL: nesses casos a hero fica no preto, sem erro.

**2026-08-19 — Site implementado até onde o conteúdo permite.** Fases 1 a 3 do plano concluídas e o esqueleto das fases 4 a 9 montado com o marcador `[A DEFINIR]`. Entregues: `index.html` com as 13 seções na ordem canônica; cinco arquivos de CSS (tokens, base, layout, components, sections); dez módulos de JavaScript nativo; as duas famílias tipográficas autohospedadas; 19 marcadores de imagem em SVG; `componentes.html` como biblioteca de referência; `404.html`, `robots.txt`, `sitemap.xml`, favicon e manifesto. Pesos: CSS 39.2KB (8.7KB comprimido), JS 14.5KB cru (limite da spec é 40KB minificado), fontes 64.1KB em três arquivos. Verificado em 360, 375 e 1440px: nenhuma rolagem horizontal, um único `h1`, nenhum salto de nível de título, toda imagem com `alt` e dimensões declaradas, alvo mínimo de toque em 44px, hero em 100svh e nenhum erro de console.

**2026-08-19 — `assets/js/config.js` é o único arquivo a editar para o site ir ao ar.** Concentra número de WhatsApp, mensagens por origem, link do mapa e redes sociais. Enquanto o número estiver vazio, todo CTA aponta para a âncora `#agendar` — funciona, não vira beco sem saída e não finge que abre o WhatsApp.

**2026-08-19 — `ferramentas/pre-publicacao.sh` criado como trava de publicação.** Varre `[A DEFINIR]`, confere o número de WhatsApp, avisa sobre os módulos opcionais e recusa marcador de imagem em SVG. Sai com código diferente de zero enquanto houver pendência. Estado atual: **bloqueado**, com 103 marcadores.

**2026-08-19 — `ferramentas/servidor.py` criado apenas para desenvolvimento.** O site continua estático e não depende dele para publicar.

**2026-08-19 — `specs/site.md` e `specs/design.md` emendados** para refletir as quatro decisões acima. Em `site.md`: seção 1 (CTA do header), seção 10 e 12 (módulos opcionais), seção 11 (mapa estático), §7 (funcionalidade do mapa) e §8 (regra do CTA por dobra). Em `design.md`: §2 (exceção do footer e regra da etiqueta de acervo), §3 (etiqueta em 12px no mobile), §8 (referência à exceção) e §11 (trilho sem sequestro de rolagem vertical).

**2026-08-19 — Criado o cérebro documental do projeto:** `CLAUDE.md`, `specs/site.md`, `specs/design.md` e `memoria.md`. Nenhuma linha de código de site foi escrita.

**2026-08-19 — Salvo o link da referência** em `referencias/landonorris.webloc`, ao lado da captura `fotoSite.pdf`.

## Problemas encontrados

**2026-08-23 — O `sips` produz AVIF QUEBRADO acima de 1536px de largura: o arquivo carrega, tem as dimensões certas e decodifica PRETO no navegador.** Esta é a causa real do "está tudo preto" da transição, e ela não tem nada a ver com carregamento.

**Como se manifesta:** `platinado.avif` (1600x777) dava `complete: true` e `naturalWidth: 1600`, ou seja, passava em toda verificação de carregamento — mas desenhado num canvas rendia **100% de pixels em rgb(0,0,0)**. O painel subia preto sobre um Manifesto preto, e o efeito parecia não existir.

**O limiar foi medido, não estimado:** 1536 de largura decodifica com cor (média RGB 144,95,82); **1560 e 1584 decodificam pretos**. Reconverter pela mesma rota, por PNG intermediário ou direto do JPEG não muda nada — o defeito é do tamanho, não da rota. Não é paridade de dimensão: oito dos nove AVIF de altura ÍMPAR do projeto decodificam normalmente, e essa foi uma hipótese minha que a medição derrubou.

**Por que só este arquivo:** é o único AVIF do projeto acima de 1536. O retrato da hero tem exatamente 1536x1024 e sempre funcionou; o `platinado-mobile.avif` (900x437), gerado da MESMA origem, também funciona.

**REGRA PARA TODA CONVERSÃO FUTURA: nenhum AVIF gerado por `sips` pode passar de 1536px de largura.** E, mais importante como método: **`complete` e `naturalWidth` NÃO provam que uma imagem aparece.** Para provar, desenhe num canvas e some os pixels — foi só assim que o defeito apareceu.

**Erro meu que atrasou o diagnóstico:** antes disto eu tinha "corrigido" o problema mexendo em `loading`, primeiro forçando `eager` nos testes (o que mascarou tudo) e depois trocando o atributo no HTML. Nada disso era a causa. **Quando uma correção plausível não resolve o sintoma relatado, a hipótese está errada — não insista nela.**

**2026-08-22 (fim do dia) — A foto da transição não carregava, e eu tinha mascarado isso no meu próprio teste.** O cliente relatou "você não colocou a imagem". Ela estava referenciada, os três arquivos existiam e o servidor os entregava — mas com `loading="lazy"` ela **nunca era buscada**: medido numa carga limpa, `currentSrc` vazio e `naturalWidth` 0 mesmo depois de rolar até a travessia. O que subia era só o fundo Piche do painel: um retângulo preto sobre um Manifesto preto, ou seja, efeito nenhum.

**Por que eu não peguei antes:** em todos os testes de verificação eu tinha escrito `img.loading = 'eager'` antes de medir, para forçar a imagem a aparecer. Isso corrigia o defeito dentro do próprio teste. **Vale como método: nunca alterar, na verificação, o atributo que governa o comportamento que se quer verificar** — o teste passa e o defeito continua no ar.

**A correção respeita o orçamento.** Deixar `loading="eager"` no HTML resolveria, mas somaria 195KB à primeira dobra, levando-a de 435KB para 630KB e estourando o teto de 600KB de `site.md` §13. Então a imagem continua `lazy` no HTML e o `sobrepor.js` a **aquece** trocando o atributo para `eager` depois do evento `load`. Medido no desktop: `load` aos 75ms, imagem pedida aos 76ms — fora do caminho crítico, e pronta muito antes de o usuário rolar os 2245px até a travessia. No celular o navegador a buscou aos 20ms mesmo assim (`lazy` é dica, não garantia), e a dobra fica em ~476KB, dentro do teto.

**2026-08-22 — O `index.html` está encolhendo entre um comando e outro, e a marcação ficou desbalanceada.** Durante esta rodada o arquivo passou de 428 para 406 e depois para 402 linhas em poucos minutos — **o cliente edita o documento ao vivo enquanto trabalho nele**. Parei de editá-lo para não sobrescrever o trabalho dele nem ter o meu sobrescrito.

**O que já saiu do documento:** o rodapé inteiro (`s-footer` e `c-fecho`), a etiqueta e o lead de "Nas redes", e antes disso o header e as seções 7 a 12. Sobraram: painel de menu (órfão), hero, manifesto, platinado, serviços, portfólio, nas redes e o CTA flutuante.

**Consequências que valem registro:** a faixa rosa do rodapé era a **exceção única à regra de dosagem** de `design.md` §2 — sem rodapé, essa exceção não tem mais objeto; e sumiram com ele o contato comercial, a linha legal e os links de rede do rodapé.

**Defeito de marcação a corrigir quando ele parar de editar:** `<main>` é aberto e **nunca fechado** (1 aberta, 0 fechada), e há um `<div>` a mais aberto que fechado — os dois vieram do corte do rodapé, que levou junto o `</main>`. O navegador se recupera fechando tudo no `</body>`, mas é HTML inválido. O `</main>` deve entrar entre o fim da seção `#redes` e o `<div class="c-flutuante">`.

**2026-08-22 — A etiqueta "Acompanhe" e o lead de "Nas redes" sumiram do HTML.** Eu os escrevi ao criar a seção e eles apareciam nas capturas; ao centralizar o cabeçalho, descobri que a `.l-fluxo` tem só o `<h2>`. Nenhuma das minhas edições posteriores tocou neles — todas foram substituições de bloco alvejadas. **Provavelmente foram removidos pelo cliente**, que já edita o `index.html` à mão. Não repus nada por conta própria. Se a intenção era deixar só o título, está como está; se foi acidente, é reescrever as duas linhas dentro da `.l-fluxo`.

**2026-08-22 — O leque abria fora da tela, então o efeito não era visto.** ~~Depois substituído em 2026-08-27:~~ o leque deixou de ser dirigido pela rolagem e passou a tocar sozinho na entrada da seção, então a medição de posição descrita abaixo não existe mais. O cliente reclamou que "não adicionou o efeito"; o mecanismo estava lá e correto, mas o progresso era medido pelo **topo da seção**, e o palco fica **374px abaixo dele**, depois da etiqueta, do título e do lead. Com a conta antiga a abertura chegava a 1 quando o leque estava só 62% na tela e ainda entrando — na rolagem normal ele já era encontrado pronto. Corrigido medindo pelo **próprio palco**: começa quando o topo do leque encosta na borda de baixo e termina quando ele está centrado verticalmente. Medido depois, em 1280x900: 0% visível → abertura 0; 36% → 0.25; 71% → 0.50; 100% → 0.75; centralizado → 1.

**Lição que vale além deste caso:** quando o progresso de rolagem comanda um elemento que não fica no topo da seção, medir pela seção adianta a animação pela distância entre os dois. **Medir sempre pelo elemento que se move**, não pelo bloco que o contém.

**2026-08-22 — O site tem 7 blocos, não 13, e o header sumiu.** Levantado ao procurar onde encaixar a seção nova. O `index.html` hoje tem hero, manifesto, platinado, serviços, portfólio, nas redes e footer. **Não existem mais:** o header inteiro (sem `<header>`, sem botão de menu, sem link "pular para o conteúdo"), Live Criativo, Cursos, Mosaico TV, Prova social, Agendamento e FAQ. O painel de menu mobile (`#menu-mobile`) **continua no HTML mas está órfão** — não há nada que o abra, já que o botão vivia no header. Nada disso foi feito por mim nesta sessão; foi removido em alguma edição anterior. `main.js` ainda inicia módulos cujos alvos não existem (trilho, comparador, vídeo, acordeão), o que não dá erro mas é peso morto. **Aguarda decisão:** reconstruir o header e as seções que faltam, ou assumir o site como esta versão curta e podar as specs e o JavaScript de acordo.

**2026-08-22 — O tropeço de "declaração local vence herança" aconteceu de novo.** Declarei `--abertura: 1` na carta e o `leque.js` escrevia no palco: o valor nunca chegava, e o leque nascia aberto com o progresso em 0. É exatamente o mesmo erro registrado em 20/08 com `--escala-final` na hero, e custou mais um ciclo mesmo estando escrito aqui. **Regra, agora em duas ocorrências: o valor padrão de uma variável dirigida por JavaScript tem de ser declarado NO MESMO elemento em que o JavaScript escreve** — nunca no descendente que a consome.

**2026-08-22 — Neste ambiente, ler `getComputedStyle` logo depois de mexer numa propriedade em transição devolve o valor de partida, para sempre.** As transições não avançam porque as etapas de renderização estão suspensas, então o valor fica congelado no início e parece que a mudança não pegou. Foi o que me fez suspeitar de um defeito inexistente no hover do leque. **Rota que funciona: clonar o elemento com `transition: none` e medir o clone** — ali a conta aparece resolvida.

**2026-08-22 — A galeria do Portfólio estava quebrada por três defeitos empilhados, e a causa raiz não era da galeria.**

**(a) O card não tinha corpo.** `.c-obra__corpo` pintava `#000` e `.c-galeria__midia` pintava `#0B0A09` — que é EXATAMENTE o fundo da seção. A caixa da foto sumia no fundo e o corpo, sendo mais escuro que a seção, lia como uma barra solta flutuando abaixo da imagem. `design.md` §7 sempre mandou "card de portfólio: fundo **Grafite** sobre Piche"; a implementação tinha se afastado disso. Os dois passaram a `var(--c-grafite)`, e o L voltou a ler como uma superfície só.

**(b) A causa raiz: `p, li { max-width: var(--medida) }` em `base.css`.** A medida de leitura de 68ch valia para TODO `<p>` e TODO `<li>` da página, inclusive os que são estrutura. Duas consequências, as duas silenciosas e as duas piorando com a tela: as **células da galeria** paravam de crescer em 623px, então um card de duas colunas media 623px onde a trilha dava 899 em 1920px e deixava um buraco na grade; e a **legenda dos cards largos** era espremida dentro de 430px, caindo à esquerda do degrau e sendo cortada pelo `clip-path`. Corrigido com uma exceção explícita ao lado da própria regra, listando o que é estrutura (`.c-galeria > li`, `.l-cards > li`, `.c-obra__aba`, `.c-servico__valor`, `.etiqueta`). `.c-curso__lista` ficou de fora de propósito: aquela é lista de texto e quer o limite.

**(c) O degrau era 46% fixo.** 46% de um card estreito não deixava faixa suficiente para a legenda. A correção que funcionou não foi a primeira: tentei dar à faixa uma largura mínima em pixels, e **errei o valor do celular para baixo** por assumir que lá a etiqueta seria menor — ela é 12px no celular contra 11 no desktop, então o celular é o pior caso, não o melhor. A solução robusta foi **inverter a lógica**: o recuo esquerdo da legenda passou a ser o próprio degrau (`padding-inline-start: calc(var(--passo-x) + var(--sp-5))`), então o texto não pode começar antes dele qualquer que seja a legenda real que substitua os marcadores.

**Verificado em 390, 768, 1280 e 1920px:** oito legendas dentro da faixa, zero sobreposições, sem rolagem horizontal, e os cards de duas colunas medindo 899px em 1920 contra os 623 travados de antes.

**2026-08-22 — O Gelo sobreviveu à varredura escondido em `rgba()` decimal.** O fundo animado dos cards de Serviço usava `rgba(127, 231, 255, .30)` e `rgba(201, 206, 214, .22)` — Gelo e Platina escritos em decimal. A varredura de mais cedo procurou por `gelo` e por `7FE7FF` e passou direto, e o turquesa continuou no ar. **Regra para a próxima troca de paleta: procurar também pelos valores em decimal**, não só pelo nome do token e pelo hexadecimal.

**2026-08-22 — O `index.html` tinha cinco links reais que a memória ainda listava como pendências.** Kiwify no Platinado e na Live, **ZapCorte no agendamento**, WhatsApp `5511973217359` nos cursos e `youtube.com/@mosaicotv23` na Mosaico TV — todos ligados nos cards de Serviços, nenhum registrado aqui. Pior: o `config.js` continuava vazio, então **todo CTA primário da página caía na âncora `#agendar`** enquanto os cards já convertiam de verdade. A página falava por dois caminhos ao mesmo tempo. Corrigido. **Lição:** quando o cliente edita o HTML à mão, a memória fica atrás da realidade — vale varrer `href=` externos antes de assumir que uma pendência continua aberta.

**2026-08-22 — Neste ambiente o `matchMedia` não entrega o evento `change`.** O painel muda o viewport de verdade (`innerWidth` acompanha e as media queries do CSS reagem), mas listeners de `change` nunca disparam. Medido com um listener armado em 768px atravessando 1280 → 375: zero disparos. É a mesma classe de limitação já registrada para o `IntersectionObserver`. Consequência prática: **montagem e desmontagem por faixa só dá para verificar por carga limpa em cada largura** — conferi 0 canvas de topografia em 375px e 5 em 1280px —, e a travessia ao vivo (tablet girando) precisa de navegador de verdade.

**2026-08-22 — Screenshot do painel devolve quadro obsoleto depois de rolar.** A primeira captura após uma navegação sai correta; qualquer captura seguinte, depois de rolar ou mexer no DOM, repete o quadro anterior. Some junto com a rolagem suave: `scroll-behavior: smooth` depende de quadros de animação, que estão suspensos, então `window.scrollTo` **não sai do lugar** — só funciona com `behavior: 'instant'`. Rota que funciona: navegar de novo para capturar, e para conferir estado usar medição em JavaScript em vez de imagem.

**2026-08-22 — A galeria saiu com os cards sobrepostos: margem em item de grid soma FORA da área.** Cada card tinha `height: 100%` mais `margin-block`, então ocupava altura-da-área + margem e invadia a linha de baixo — medido: área de 464px com caixa de 496px. Corrigido separando a **célula** do **card**: a `<li>` é a célula, recebe as fileiras e o recuo em **padding**, e o card mora dentro com `height: 100%`. Padding fica dentro da área e não pode transbordar. Verificado depois: **zero sobreposições** entre os oito cards. Regra para não repetir: recuo de item de grid é padding, nunca margem, quando a altura é fixada por `grid-row: span`.

**2026-08-22 — O Gelo ainda aparece fora da galeria.** ~~RESOLVIDO no mesmo dia:~~ varredura feita, `#7FE7FF` não existe mais no projeto. Registro mantido porque explica de onde veio o token `--foco`. Depois da troca de identidade, `#7FE7FF` continua em uso no `.serif` do Manifesto e nas palavras da frase em cascata, além de botões e detalhes em outras seções. **Aguarda decisão** sobre a varredura do site inteiro para as três cores novas.

**2026-08-21 — As instruções que acompanham componentes de bibliotecas React não servem a este projeto.** O material pedia shadcn, Tailwind, TypeScript, pasta `/components/ui` e alias `@/`. Aqui é HTML/CSS/JS estático com React apenas dentro de `src/efeito/` para os shaders. Adaptar o visual é viável; seguir as instruções ao pé da letra significaria reescrever o projeto. Vale repetir esse aviso sempre que chegar um componente nesse formato.

**2026-08-21 — `.s-servicos .c-servico { background: var(--c-osso) }` vencia a variante escura.** A regra da seção tem especificidade 0,2,0 e `sections.css` carrega depois de `components.css`, então a minha regra de uma classe perdia duas vezes. O card ficava com texto Osso sobre fundo Osso — invisível. Corrigido excluindo a variante na própria regra da seção, com `:not(.c-servico--escuro)`, em vez de inflar especificidade do lado do componente.

**2026-08-21 — `clip-path` não impede transbordo rolável.** A camada animada usa `inset: -60%`; o entalhe recorta a pintura, mas o transbordo ainda contava para a largura do documento e criava rolagem horizontal. Resolvido com `overflow: hidden` no card.

**2026-08-21 — O vídeo do Platinado é vertical (9:16), e `design.md` §9 fixa 16:9 para vídeo.** O material entregue é 576x1024. Em vez de recortá-lo para 16:9 — o que jogaria fora a maior parte do quadro —, a caixa passou a acompanhar a proporção do arquivo, com largura limitada a 400px e centralizada na coluna de mídia, para uma peça vertical não dominar a seção. **Substitui a proporção fixa de §9 para esta seção.**

**2026-08-21 — O `<track>` tinha sido apontado para o `.mp4`.** Numa edição manual, a tag de legenda ficou com `src="/assets/video/VdPlatinado.mp4"`. `<track>` só aceita arquivo `.vtt`: o navegador tentaria carregar o vídeo como legenda e falharia. Devolvida ao estado comentado, com o caminho de um `.vtt`.

**2026-08-21 — Não dá para saber daqui se o áudio do vídeo tem fala.** ~~RESOLVIDO em 2026-08-22:~~ o cliente confirmou que é só música. Existe uma faixa AAC no arquivo. Se houver fala, `site.md` §12 exige legenda e o `.vtt` precisa ser fornecido. **Aguarda confirmação do cliente.**

**2026-08-20 — Neste ambiente o `IntersectionObserver` não dispara e transições CSS não avançam.** O painel do navegador fica oculto e as etapas de renderização ficam suspensas, então nada que dependa delas roda. Medido: **nenhum** dos 27 elementos `.revelar` que já existiam no projeto fica visível aqui, e um observador novo criado na hora também não dispara. Não é defeito do código — é o ambiente. Para verificar entradas por rolagem, o caminho é ler os estados inicial e final desligando a transição, e conferir no navegador de verdade.

**2026-08-20 — Fonte manuscrita em CAIXA ALTA não produz assinatura conectada.** ~~RESOLVIDO em 2026-08-22~~ desenhando a assinatura em SVG, que atende aos dois pedidos ao mesmo tempo. O diagnóstico abaixo continua valendo para qualquer fonte script. A referência do cliente é uma assinatura de traço contínuo; `MOSAICO` em Caveat Brush sai como letras de marcador **soltas**, sem ligadura. Não é defeito da fonte escolhida: em praticamente toda script as maiúsculas não conectam, porque a conexão vive nas formas de caixa baixa. Os dois pedidos do cliente — texto exatamente "MOSAICO" e "letras conectadas" — são incompatíveis na prática. **Aguarda decisão:** renderizar "Mosaico" em caixa mista (mesma palavra, aí sim conectada), ou aceitar o traço solto em caixa alta.

**2026-08-20 — A hero ficou preta e vazia no topo: `position: sticky` continua no fluxo.** Ao acrescentar a camada de topografia do entorno, dei `sticky` a ela — e sticky, ao contrário de `absolute`, **ocupa espaço no fluxo**. A camada passou a medir uma dobra de altura dentro da pista e empurrou `.s-hero__palco` para baixo dela, então o topo da página mostrava a camada vazia e a hero só aparecia depois de rolar. Corrigido devolvendo `position: absolute` à camada e passando o `sticky` para o **canvas dentro dela**, que é quem pode grudar sem afetar o fluxo do palco.

**2026-08-20 — E o canvas não grudava por causa de `overflow: hidden`.** Feita a correção acima, o canvas ainda subia com a rolagem: `.s-fundo-topo` tem `overflow: hidden`, e overflow diferente de `visible` num ancestral torna esse ancestral o scrollport do sticky. É o mesmo tropeço que já tinha acontecido com `.s-hero` no dia anterior. Resolvido com `overflow: visible` na variante presa — nada transborda de qualquer forma, porque o canvas mede uma dobra dentro de uma pista de duas.

**2026-08-20 — São seis contextos WebGL na página agora** *(no celular caiu para um em 2026-08-22; no desktop continuam seis)*: cinco de topografia mais o da tinta da hero. Cada um pausa por `IntersectionObserver` e por aba oculta, então na prática rodam de um a três por vez, mas o custo de memória é permanente e soma ao orçamento de desempenho já estourado de `site.md` §13. Se pesar, o caminho é reduzir o `escala` das camadas (hoje 0.6) ou desligar a topografia abaixo de 768px.

**2026-08-20 — A tinta só aparecia no meio da hero.** As manchas estavam em coordenadas absolutas, presas a uma faixa central, então revelar perto das bordas não encontrava tinta nenhuma. Corrigido amarrando a composição à **meia-extensão visível da tela**: as posições passaram a ser normalizadas (-1 a 1) e são multiplicadas pela extensão, o que faz a tinta alcançar bordas e cantos em qualquer proporção — no desktop a extensão é (0.80, 0.50) e no celular (0.42, 0.91). O número de manchas subiu de 9 para 17, os raios acompanham a escala da tela, e o vulto passou a mirar de 0.04 a 0.96 em vez de ficar no miolo.

**2026-08-20 — O novo retrato (`images/retratoNatanV2.png`) não é recortado.** ~~RESOLVIDO em 2026-08-22:~~ o v3 entregue pelo cliente tem alfa de verdade. Ver as três exceções assumidas em Decisões aprovadas. É uma foto em paisagem, 1536×1024, com fundo preto chapado e sem canal alfa, no lugar do PNG com transparência anterior. Duas consequências: o retângulo preto da foto **tapa a tinta** onde ela passaria por trás, e com `object-fit: contain` apoiado na base a foto vira uma faixa larga e baixa, que no celular quase desaparece contra o preto. As dimensões declaradas também estavam como `width="10" height="10"`, o que reservava a caixa errada; corrigido para 1536×1024. **Aguarda decisão:** recortar o retrato com alfa, voltar ao anterior, ou mudar o enquadramento da hero.

**2026-08-20 — Dois defeitos do efeito encontrados na verificação e corrigidos.** (a) `pow()` com base negativa é indefinido em GLSL e `(f - 1.0)` fica negativo fora da mancha: propagava NaN e apagava a tela inteira; trocado por multiplicação. (b) `dimensionar()` comparava com um cache próprio e travava num tamanho degenerado quando a primeira medida acontecia antes do layout; passou a comparar com o próprio canvas e a cair para a caixa do pai. Também foi acrescentado o redesenho no `ResizeObserver` para quem usa `prefers-reduced-motion`, que não tem laço de animação.

**2026-08-20 — O efeito estoura o orçamento de desempenho por larga margem.** O módulo compilado tem 728KB crus e ~187KB comprimidos, contra o limite de 40KB de `site.md` §13, e a simulação roda em laço contínuo bem em cima do LCP da página. A meta de Lighthouse mobile ≥ 90 de `site.md` §13 provavelmente não se sustenta como está. Caminhos possíveis, se isso incomodar: baixar `resolution`, desligar o fluido abaixo de 768px, ou voltar ao porte em WebGL2 puro, que dispensaria o Three.js. **Aguarda decisão.**

**2026-08-20 — O componente marca a própria camada com `touch-action: none`**, o que trancaria a rolagem vertical no celular em cima da hero e cairia na proibição de sequestro de rolagem de `design.md` §13. Corrigido em `sections.css` com `touch-action: pan-y` na camada, o que devolve a rolagem e mantém o toque alimentando o fluido.

**2026-08-20 — `ferramentas/pre-publicacao.sh` não sabe do build.** A trava de publicação foi escrita quando o site não tinha etapa de build e não confere se `assets/efeito/` está atualizado. Vale acrescentar essa checagem antes de publicar.

**2026-08-19 — A hero ficou escura e o Manifesto, que vem logo depois, também é escuro.** ~~RESOLVIDO em 2026-08-22:~~ exceção declarada em `design.md` §2, hero e Manifesto são um capítulo escuro único. São duas seções escuras seguidas fora do bloco portfólio+TV, o que `design.md` §2 proíbe e o que muda o ritmo de fundos aprovado para D · D · L · L · D · L · L · D · L · L · L · D. Registrado também no topo de `assets/css/sections.css`. **Aguarda decisão:** clarear o Manifesto, fundir as duas dobras ou abrir a exceção na regra.

**2026-08-19 — A página está sem `<h1>`.** ~~RESOLVIDO em 2026-08-22:~~ a frase do Manifesto virou o `h1` e os CTAs foram junto. O bloco de texto da hero (etiqueta, `h1`, lead, CTA primário, CTA secundário e selo) já estava vazio antes desta rodada, e a `div.l-fluxo` estava sem fechamento, o que fazia a `</section>` fechar errado. A marcação foi corrigida, mas com a decisão de deixar a primeira dobra só com o retrato o `h1` e os CTAs ficaram sem lugar. Isso contraria `site.md` §12 (um único `h1` obrigatório) e §8 (CTA primário na primeira dobra). **Aguarda decisão** sobre em qual seção eles passam a viver — o candidato natural é o Manifesto, que na referência é justamente onde entra o título gigante.

**2026-08-19 — Título provisório do hero, aguardando aprovação.** O `h1` está como "Cada cabeça é uma composição", derivado da proposta de valor já aprovada em `specs/site.md` §3. **Não é a frase de posicionamento oficial** (pendência 9). Substituir quando a frase aprovada chegar.

**2026-08-19 — Quatro defeitos encontrados na verificação visual e corrigidos.** (a) A sentinela do header estava a 0px e ligava o estado "rolado" já no topo, o que fazia o CTA aparecer antes da hora; passou para 80px. (b) O header ficava ilegível sobre o hero escuro; ganhou estado de texto claro enquanto não rola. (c) O seletor `.s-manifesto p` vencia `.small` por especificidade e jogava o parágrafo de assinatura na escala display; o escopo virou `.s-manifesto__frase`. (d) No celular, o CTA oculto do header ainda ocupava espaço e empurrava o botão de menu para o meio da tela; no mobile ele agora é `display:none`, já que lá quem manda é o CTA flutuante.

**2026-08-19 — O trilho do portfólio perdia a semântica de lista.** A `<ul>` acumulava `role="region"`, o que anula o papel de lista. A pista de rolagem virou uma `<div>` com `role="region"` e a `<ul>` voltou a ser uma lista de verdade.

**2026-08-19 — O processo do preview roda em sandbox e não enxerga a pasta do projeto.** O servidor precisa ser iniciado fora dele. Registrado em `.claude/launch.json` com caminho absoluto, mas na prática subo por linha de comando.

**2026-08-19 — O briefing citou a pasta `@referencia-site`, que não existe.** O material está em `referencias/`. Resolvido, mas vale confirmar se existe outra pasta de referência que eu ainda não vi.

**2026-08-19 — Não havia leitor de PDF no ambiente** (`pdftoppm` ausente), o que impedia a leitura da captura de 7 páginas.

**2026-08-19 — Dois dos cinco serviços não têm definição suficiente para virar seção:** "Live Criativo na Tesoura" e "Mosaico TV". Sem saber o formato, não dá para definir layout, conteúdo nem CTA dessas seções.

**2026-08-19 — Os dados comerciais ainda não foram repassados.** Telefone, endereço, horários, preços e informações de turma existem, mas não chegaram até mim. As seções que dependem deles não podem ser implementadas.

## Soluções aplicadas

**2026-08-19 — Renderização do PDF por PDFKit via JXA** (`osascript -l JavaScript`), gerando PNG por página em 2× e redimensionando com `sips`. Permitiu a leitura completa da referência sem instalar nada no sistema. Reaproveitar essa rota se surgir outro PDF.

**2026-08-19 — Extração dos valores reais do site de referência** com JavaScript no navegador embutido, coletando cores computadas, famílias tipográficas, escala de títulos, raios e altura das seções. Confirmou a leitura visual da captura e evitou estimativa de cor "no olho".

**2026-08-19 — Marcador `[A DEFINIR]` adotado como convenção** para todo dado comercial ausente, em vez de texto inventado ou de preenchimento em latim.

## Pendências

Bloqueadores de implementação, na ordem em que travam o trabalho:

0c. ~~Captura da fonte Nighty~~ — **resolvido em 2026-08-22:** o cliente enviou a captura, a assinatura foi redesenhada no caráter dela e a revelação virou varredura.

0a. **Duas fotos do leque são de família, em cenário de Natal, com crianças pequenas.** São `FotoM05` e `FotoM06`, hoje nas pontas do leque. Publicar imagem de criança identificável num site comercial envolve direito de imagem e consentimento, e as duas também fogem do que a seção promete ("o que sai da cadeira todo dia"). **Avisei o cliente; aguarda decisão** — trocar por outras duas fotos, ou reduzir o leque para cinco cartas, o que o módulo aceita sem alteração de código.

0b. **A galeria precisa do DOBRO de fotos.** Cada card mostra duas: a principal e a que aparece no hover. Com a grade 3x3 são **9 cards, logo 18 imagens** — eram 16 até 22/08. Todas em 4:5, que é a proporção travada na mídia. Os marcadores estão em `assets/img/portfolio/` como `obra-NN.svg` (principal) e `obra-NNb.svg` (secundária).

1. ~~Número de WhatsApp~~ — **resolvido em 2026-08-22:** `5511973217359`, em `config.js`.
2. ~~Confirmar o canal do CTA~~ — **resolvido em 2026-08-22:** ZapCorte no agendamento, WhatsApp no curso.
3. **Endereço e horários por dia da semana.** Continuam faltando: a seção de Agendamento e localização não pode ser fechada sem eles, nem os dados estruturados `LocalBusiness`.
4. **Tabela completa de serviços com valores.** Existem preços em dois cards (Platinado e Cursos, confirmados como reais). Falta o resto da cadeira: corte, barba, coloração.
5. **Dados dos cursos:** carga horária, datas das turmas e número de vagas. O investimento e o link de pagamento já existem.
6. **Definir o que é a "Live Criativo na Tesoura".** Já tem link de pagamento no Kiwify, o que sugere ingresso ou inscrição, mas o formato (transmissão, evento presencial ou performance), a duração e o valor continuam `[A DEFINIR]`.
7. ~~Definir o que é a "Mosaico TV"~~ — **resolvido em 2026-08-22:** canal no YouTube, `@mosaicotv23`, já ligado no `config.js`.
8. **Repasse das fotos em alta resolução** para o Portfólio e o Platinado.
9. **Logo da Mosaico em SVG**, se existir.
10. **Nome e credenciais reais do profissional responsável.**
11. **Depoimentos com autorização de uso** — não confirmados; sem eles a seção de prova social sai do ar.
12. ~~Instagram e TikTok~~ — **resolvido em 2026-08-22:** `@mosaicooff` nos dois, em `config.js`. As três redes estão ativas.
13. **Domínio e onde o site será publicado.**
14. **Retrato próprio para a hero**, se e quando o cliente quiser trocar o v3 gerado por IA. Não é bloqueador: ele decidiu manter o atual e a exceção está escrita em `design.md` §9.

## Próximos passos

Ordem de implementação aprovada, em 10 fases. A dependência indicada é a pendência que trava a fase.

1. ~~**Fundação**~~ — **concluída.**
2. ~~**Biblioteca de componentes**~~ — **concluída** em `componentes.html`.
3. ~~**Header, navegação, menu mobile, CTA flutuante e links**~~ — **concluída na estrutura.** Falta só o número de WhatsApp em `assets/js/config.js` para os CTAs abrirem a conversa.
4. ~~**Hero e Manifesto**~~ — **concluída em 2026-08-22.** Retrato em AVIF, assinatura desenhada, `h1` e CTAs no lugar, exceção de ritmo declarada. Só troca de foto, se o cliente quiser (pendência 14).
5. **Platinado Concept e Serviços.** *Depende de 4 e 8.*
6. **Portfólio e Mosaico TV.** *Depende de 7 e 8.*
7. **Live Criativo e Cursos.** *Depende de 5 e 7.*
8. **Agendamento e localização, FAQ e Prova social** (as duas últimas, se houver conteúdo). *Depende de 3 e 11.*
9. **Footer, SEO, Open Graph, dados estruturados, favicon e sitemap.** *Depende de 12 e 13.*
10. **Passagem final** — acessibilidade, desempenho, teste em 360, 390, 768, 1280 e 1920px, varredura de `[A DEFINIR]` no HTML e publicação.

*(O lembrete sobre o comparador antes/depois foi retirado: o Platinado trocou o comparador por vídeo em 2026-08-21, e o vídeo real já está no ar.)*

**A fazer antes de publicar, além das pendências:** `ferramentas/pre-publicacao.sh` continua sem saber da etapa de build — não confere se `assets/efeito/` está atualizado — e ainda recusa marcador de imagem em SVG, o que hoje barra os 19 marcadores restantes. Rodar e ler a saída antes de qualquer subida.
