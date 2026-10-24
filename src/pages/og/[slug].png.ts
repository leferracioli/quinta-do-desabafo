// Imagem de compartilhamento de cada artigo: /og/<slug>.png
import type { APIRoute, GetStaticPaths } from 'astro';
import { getArtigos, numeroEdicao, type Artigo } from '../../lib/artigos';
import { gerarOg } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const artigos = await getArtigos();
  return artigos.map((artigo) => ({ params: { slug: artigo.data.slug }, props: { artigo } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { data } = (props as { artigo: Artigo }).artigo;
  const png = await gerarOg({
    kicker: `Quinta do Desabafo · Nº ${numeroEdicao(data.edicao)} · ${data.tema}`,
    titulo: data.title,
    destaque: data.palavraDestaque,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
