// robots.txt: libera explicitamente os buscadores e os crawlers de IA (objetivo de GEO).
import type { APIRoute } from 'astro';

const ROBOS = [
  'Googlebot',
  'Bingbot',
  'Google-Extended', // Gemini
  'GPTBot',          // OpenAI (treino)
  'OAI-SearchBot',   // ChatGPT Search
  'ChatGPT-User',    // ChatGPT abrindo links a pedido do usuário
  'ClaudeBot',       // Anthropic
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'DuckDuckBot',
];

export const GET: APIRoute = ({ site }) => {
  const blocos = ROBOS.map((r) => `User-agent: ${r}\nAllow: /`).join('\n\n');
  const corpo = `${blocos}

User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap-index.xml', site).href}
`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
