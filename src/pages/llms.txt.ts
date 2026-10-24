// llms.txt: resumo do site e lista de artigos em Markdown, para assistentes de IA.
// Formato proposto em https://llmstxt.org
import type { APIRoute } from 'astro';
import { getArtigos, numeroEdicao } from '../lib/artigos';
import { SITE } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const url = (c: string) => new URL(c, site).href;
  const artigos = (await getArtigos()).filter((a) => !a.data.draft);

  const lista = artigos.length
    ? artigos
        .map((a) => `- [Nº ${numeroEdicao(a.data.edicao)} · ${a.data.title}](${url(`/desabafos/${a.data.slug}`)}): ${a.data.resumoDireto}`)
        .join('\n')
    : '- A primeira edição sai em breve.';

  const corpo = `# ${SITE.nome}

> Blog de ${SITE.autora}, supervisora comercial com mais de 8 anos em marketing digital e liderança de times de vendas. Toda quinta-feira, um artigo aprofunda uma notícia da semana sobre vendas, gestão comercial, IA aplicada a vendas e marketing digital: o que aconteceu, por que importa, dados com fonte primária, o que outros especialistas dizem e a visão prática da autora.

Cada artigo começa com uma resposta direta de 2 a 3 frases, usa intertítulos em forma de pergunta, termina com perguntas frequentes e lista as fontes com links. Os dados vêm de fontes primárias citadas no próprio texto.

## Artigos

${lista}

## Páginas

- [Sobre a autora](${url('/sobre')}): quem é ${SITE.autora} e como o blog é escrito
- [Arquivo](${url('/desabafos')}): todos os artigos, filtráveis por tema
- [RSS](${url('/rss.xml')})

## Redes

- [Instagram](${SITE.instagram})
- [LinkedIn](${SITE.linkedin})
`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
