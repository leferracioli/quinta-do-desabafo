// Imagem de compartilhamento da home, soluções e contato: /og/inicio.png
import type { APIRoute } from 'astro';
import { gerarOg } from '../../lib/og';

export const GET: APIRoute = async () => {
  const png = await gerarOg({
    kicker: 'Mentoria e consultoria comercial',
    titulo: 'Vendas e gestão comercial, sem fórmula mágica.',
    destaque: 'mágica',
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
