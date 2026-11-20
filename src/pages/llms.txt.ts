// llms.txt: resumo do site, das soluções e da lista de artigos em Markdown, para assistentes de IA.
// Formato proposto em https://llmstxt.org
import type { APIRoute } from 'astro';
import { getArtigos, numeroEdicao } from '../lib/artigos';
import { SITE } from '../lib/site';
import { SOLUCOES } from '../lib/solucoes';
import { PROJETOS } from '../lib/projetos';

export const GET: APIRoute = async ({ site }) => {
  const url = (c: string) => new URL(c, site).href;
  const artigos = (await getArtigos()).filter((a) => !a.data.draft);

  const lista = artigos.length
    ? artigos
        .map((a) => `- [Nº ${numeroEdicao(a.data.edicao)} · ${a.data.title}](${url(`/desabafos/${a.data.slug}/`)}): ${a.data.resumoDireto}`)
        .join('\n')
    : '- A primeira edição sai em breve.';

  const projetos = PROJETOS.map((p) => `- [${p.titulo}](${url(`/projetos/${p.slug}/`)}) (${p.status}, ${p.contexto.toLowerCase()}): ${p.resumo}`).join('\n');

  const solucoes = SOLUCOES.map((s) => `- [${s.nome}](${url(`/solucoes/#${s.id}`)}): ${s.paraQuem} ${s.resumo}`).join('\n');

  const corpo = `# ${SITE.nome}

> Site de ${SITE.autora}, que trabalha com gestão comercial e inteligência de dados. Começou como vendedora, foi para a liderança e constrói painéis de desempenho, radares de oportunidade e análises de atendimento com IA para operações comerciais. No marketing digital desde 2018. Oferece mentoria, consultoria comercial e projetos de inteligência comercial sob medida, e escreve a Quinta do Desabafo, um artigo semanal sobre vendas, gestão comercial, IA aplicada a vendas e marketing digital.

## Soluções

${solucoes}

Contato: WhatsApp ${SITE.telefone} ou o formulário em ${url('/contato/')}.

## Projetos

Estudos de caso anonimizados: sem nome de empresa e sem números da operação.

${projetos}

## Quinta do Desabafo

Toda quinta-feira, um artigo aprofunda uma notícia da semana: o que aconteceu, por que importa, dados com fonte primária, o que outros especialistas dizem e a visão prática da autora. Cada artigo começa com uma resposta direta de 2 a 3 frases, usa intertítulos em forma de pergunta, termina com perguntas frequentes e lista as fontes com links.

${lista}

## Páginas

- [Sobre](${url('/sobre/')}): quem é ${SITE.autora} e como o blog é escrito
- [Projetos](${url('/projetos/')}): o que ela já construiu, com o status de cada projeto
- [Quinta do Desabafo](${url('/desabafos/')}): todas as edições, filtráveis por tema
- [Soluções](${url('/solucoes/')}): diagnóstico gratuito, sessão de direcionamento, mentoria, consultoria e inteligência comercial sob medida
- [Contato](${url('/contato/')})
- [RSS](${url('/rss.xml')})

## Redes

- [Instagram](${SITE.instagram})
- [LinkedIn](${SITE.linkedin})
`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
