// llms.txt: resumo do site, das soluções e da lista de artigos em Markdown, para assistentes de IA.
// Formato proposto em https://llmstxt.org
import type { APIRoute } from 'astro';
import { getArtigos, numeroEdicao } from '../lib/artigos';
import { SITE } from '../lib/site';
import { SOLUCOES } from '../lib/solucoes';

export const GET: APIRoute = async ({ site }) => {
  const url = (c: string) => new URL(c, site).href;
  const artigos = (await getArtigos()).filter((a) => !a.data.draft);

  const lista = artigos.length
    ? artigos
        .map((a) => `- [Nº ${numeroEdicao(a.data.edicao)} · ${a.data.title}](${url(`/desabafos/${a.data.slug}/`)}): ${a.data.resumoDireto}`)
        .join('\n')
    : '- A primeira edição sai em breve.';

  const solucoes = SOLUCOES.map((s) => `- [${s.nome}](${url(`/solucoes/#${s.id}`)}): ${s.paraQuem} ${s.resumo}`).join('\n');

  const corpo = `# ${SITE.nome}

> Site de ${SITE.autora}, supervisora comercial que trabalha com marketing digital desde 2018 e hoje atua na gestão comercial: equipes, processos, indicadores, CRM e automações. Oferece mentoria e consultoria comercial e escreve a Quinta do Desabafo, um artigo semanal sobre vendas, gestão comercial, IA aplicada a vendas e marketing digital.

## Soluções

${solucoes}

Contato: WhatsApp ${SITE.telefone} ou o formulário em ${url('/contato/')}.

## Quinta do Desabafo

Toda quinta-feira, um artigo aprofunda uma notícia da semana: o que aconteceu, por que importa, dados com fonte primária, o que outros especialistas dizem e a visão prática da autora. Cada artigo começa com uma resposta direta de 2 a 3 frases, usa intertítulos em forma de pergunta, termina com perguntas frequentes e lista as fontes com links.

${lista}

## Páginas

- [Sobre a autora](${url('/sobre/')}): quem é ${SITE.autora} e como o blog é escrito
- [Quinta do Desabafo](${url('/desabafos/')}): todas as edições, filtráveis por tema
- [Soluções](${url('/solucoes/')}): mentoria e consultoria comercial
- [Contato](${url('/contato/')})
- [RSS](${url('/rss.xml')})

## Redes

- [Instagram](${SITE.instagram})
- [LinkedIn](${SITE.linkedin})
`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
