// Imagem de compartilhamento padrão (home, arquivo, sobre, 404): /og/site.png
import type { APIRoute } from 'astro';
import { gerarOg } from '../../lib/og';

export const GET: APIRoute = async () => {
  const png = await gerarOg({
    kicker: 'Toda quinta-feira · por Letícia Ferracioli',
    titulo: 'Quinta do Desabafo: vendas, gestão comercial e IA sem rodeio',
    destaque: 'Desabafo',
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
