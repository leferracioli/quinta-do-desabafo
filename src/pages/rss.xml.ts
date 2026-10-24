// Feed RSS: /rss.xml
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getArtigos } from '../lib/artigos';
import { SITE } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const artigos = (await getArtigos()).filter((a) => !a.data.draft);
  return rss({
    title: SITE.nome,
    description: 'Toda quinta, um desabafo sobre vendas, gestão comercial, IA em vendas e marketing digital, por Letícia Ferracioli.',
    site: site!,
    items: artigos.map((a) => ({
      title: a.data.title,
      description: a.data.resumoDireto,
      link: `/desabafos/${a.data.slug}`,
      pubDate: a.data.publishedAt,
      categories: [a.data.tema],
      author: SITE.autora,
    })),
    customData: '<language>pt-BR</language>',
  });
};
