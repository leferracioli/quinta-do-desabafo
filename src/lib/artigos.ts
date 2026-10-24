import { getCollection, type CollectionEntry } from 'astro:content';

export type Artigo = CollectionEntry<'artigos'>;

/** Todos os artigos, da edição mais nova para a mais antiga. Rascunhos só aparecem no dev. */
export async function getArtigos(): Promise<Artigo[]> {
  const todos = await getCollection('artigos', ({ data }) => import.meta.env.DEV || !data.draft);

  // Duas edições com o mesmo número quebram o build
  const vistos = new Map<number, string>();
  for (const a of todos) {
    const outro = vistos.get(a.data.edicao);
    if (outro) throw new Error(`Desabafo Nº ${a.data.edicao} repetido em "${a.id}" e "${outro}"`);
    vistos.set(a.data.edicao, a.id);
  }
  return todos.sort((a, b) => b.data.edicao - a.data.edicao);
}

/** Minutos de leitura: texto do corpo + FAQ, a ~200 palavras por minuto. */
export function tempoLeitura(artigo: Artigo): number {
  const corpo = (artigo.body ?? '').replace(/<[^>]+>|[#*_>`{}[\]()|]/g, ' ');
  const faq = artigo.data.faq.map((f) => `${f.pergunta} ${f.resposta}`).join(' ');
  const palavras = `${artigo.data.resumoDireto} ${corpo} ${faq}`.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

/** 24 de outubro de 2026 */
export const dataLonga = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** 7 → "07" */
export const numeroEdicao = (n: number) => String(n).padStart(2, '0');

/** 24 out 2026 */
export const dataCurta = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).replace(/\./g, '').replace(/ de /g, ' ');

/** As primeiras n frases de um texto (para a capa da home) */
export function primeirasFrases(texto: string, n = 2): string {
  const frases = texto.match(/[^.!?]+[.!?]+/g) ?? [texto];
  return frases.slice(0, n).join('').trim();
}

/** "gestão comercial" → "gestao-comercial" (endereço da página do tema) */
export const temaSlug = (tema: string) =>
  tema.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
