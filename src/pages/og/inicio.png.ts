// Imagem de compartilhamento da home, soluções e contato: /og/inicio.png
import type { APIRoute } from 'astro';
import { gerarOg } from '../../lib/og';

export const GET: APIRoute = async () => {
  const png = await gerarOg({
    kicker: 'Gestão comercial · Inteligência de dados · Sistemas com IA',
    titulo: 'Eu construo as ferramentas que a operação comercial ainda não tem.',
    destaque: 'construo',
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
