# Mosaico — Landing Page

Projeto de landing page premium para a **Mosaico**, barbearia e cabeleireiro.
Este arquivo deve ser lido sempre que esta pasta for aberta.

## Fontes de verdade

- **@specs/site.md** — o que precisa ser construído: objetivo, público, seções, funcionalidades, escopo, stack, requisitos.
- **@specs/design.md** — como deve parecer: paleta, tipografia, espaçamento, componentes, movimento, regras visuais.
- **@memoria.md** — histórico vivo: decisões aprovadas e rejeitadas, alterações, problemas, pendências e próximos passos.

Em caso de conflito entre os três, a ordem de prioridade é: `memoria.md` (mais recente) → `specs/site.md` → `specs/design.md`.

## Regra de conflito (obrigatória)

> Se algum pedido meu contradisser uma decisão registrada em @specs/site.md, @specs/design.md ou @memoria.md, pare e me avise antes de realizar qualquer alteração. Explique qual decisão seria afetada e pergunte se desejo substituí-la.

## Regras de trabalho

- Não altere a stack técnica sem minha autorização.
- Não remova uma decisão aprovada silenciosamente.
- Não invente informações comerciais, médicas ou técnicas sobre o produto. Preço, endereço, horário, datas de turma, resultados e credenciais só entram no site se eu tiver fornecido. Na falta do dado, use um marcador explícito (`[A DEFINIR]`) e registre em @memoria.md.
- Sempre preserve a consistência visual e estrutural entre as seções: mesmos tokens, mesmo grid, mesmo ritmo, mesmos componentes.
- Antes de uma mudança grande, apresente um plano resumido e aguarde aprovação.
- Depois de uma decisão importante aprovada, atualize @memoria.md.

## Contexto essencial

- **Serviço:** barbearia e cabeleireiro Mosaico.
- **Cinco frentes:** Agendar Horário · Platinado Concept · Live Criativo na Tesoura · Cursos Presenciais · Mosaico TV.
- **Objetivo:** apresentar e vender o serviço com acabamento premium.
- **Formato:** landing page única em português (BR), com navegação por âncoras.
- **Stack:** HTML + CSS + JavaScript puro, sem framework e sem etapa de build.
- **Referência visual:** `referencias/` (captura em PDF + link). Serve como direção de estrutura e atmosfera. Nada de lá é copiado — texto, nome, logo, imagens e elementos de marca são originais da Mosaico.

## Estado atual

Fase de documentação concluída. **Nenhum código de site foi escrito ainda.** Não comece a implementar sem pedido explícito.
