// Dados estruturados (JSON-LD) para Google e buscadores com IA.
import { SITE } from './site';
import type { Artigo } from './artigos';
import { SOLUCOES } from './solucoes';

const url = (caminho: string, site: URL) => new URL(caminho, site).href;

/** Identificador único da Letícia, referenciado em todas as páginas */
export const idPessoa = (site: URL) => `${url('/sobre/', site)}#leticia`;

/** Person resumida (para author/publisher) */
export const pessoaRef = (site: URL) => ({
  '@type': 'Person',
  '@id': idPessoa(site),
  name: SITE.autora,
  url: url('/sobre/', site),
});

/** Person completa, usada na página Sobre */
export const pessoaCompleta = (site: URL, imagem?: string) => ({
  ...pessoaRef(site),
  jobTitle: 'Consultora de gestão e inteligência comercial',
  description: 'Gestão comercial e inteligência de dados: começou como vendedora, foi para a liderança e constrói painéis, radares de oportunidade e análises de atendimento com IA para operações comerciais. No marketing digital desde 2018.',
  knowsAbout: ['gestão comercial', 'inteligência comercial', 'análise de dados comerciais', 'CRM', 'automação comercial', 'IA aplicada a vendas', 'liderança de equipes de vendas', 'marketing digital'],
  sameAs: [SITE.instagram, SITE.linkedin],
  ...(imagem && { image: imagem }),
});

export const migalhas = (site: URL, itens: { nome: string; caminho: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: itens.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.nome,
    item: url(item.caminho, site),
  })),
});

export const siteWeb = (site: URL) => ({
  '@type': 'WebSite',
  '@id': `${url('/', site)}#site`,
  name: SITE.nome,
  url: url('/', site),
  inLanguage: 'pt-BR',
  description: 'Gestão comercial, inteligência de dados e sistemas com IA com Letícia Ferracioli: mentoria, consultoria e projetos sob medida. E a Quinta do Desabafo: toda quinta, vendas, gestão comercial, IA e marketing digital além da manchete.',
  publisher: { '@id': idPessoa(site) },
});

/** Article + FAQPage + BreadcrumbList de um Desabafo */
export function grafoArtigo(artigo: Artigo, site: URL, imagem: string) {
  const d = artigo.data;
  const caminho = `/desabafos/${d.slug}/`;
  const grafo: object[] = [
    {
      '@type': 'Article',
      '@id': `${url(caminho, site)}#artigo`,
      headline: d.title,
      description: d.description,
      abstract: d.resumoDireto,
      inLanguage: 'pt-BR',
      datePublished: d.publishedAt.toISOString(),
      dateModified: (d.updatedAt ?? d.publishedAt).toISOString(),
      author: pessoaRef(site),
      publisher: { '@id': idPessoa(site) },
      image: imagem,
      mainEntityOfPage: url(caminho, site),
      articleSection: d.tema,
      keywords: [d.palavraChave, ...d.variacoes],
      isPartOf: { '@id': `${url('/', site)}#site` },
    },
    migalhas(site, [
      { nome: 'Início', caminho: '/' },
      { nome: 'Quinta do Desabafo', caminho: '/desabafos/' },
      { nome: d.title, caminho },
    ]),
  ];
  if (d.faq.length) {
    grafo.push({
      '@type': 'FAQPage',
      mainEntity: d.faq.map((f) => ({
        '@type': 'Question',
        name: f.pergunta,
        acceptedAnswer: { '@type': 'Answer', text: f.resposta },
      })),
    });
  }
  return grafo;
}

/** Mentoria, consultoria e inteligência sob medida como Service, oferecidas pela Letícia */
export const servicos = (site: URL) =>
  SOLUCOES.map((s) => ({
    '@type': 'Service',
    '@id': `${url('/solucoes/', site)}#${s.id}`,
    name: s.nome,
    serviceType: s.nome,
    description: `${s.paraQuem} ${s.resumo}`,
    provider: { '@id': idPessoa(site) },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    availableLanguage: 'pt-BR',
    url: url(`/solucoes/#${s.id}`, site),
  }));
