// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { satteri } from '@astrojs/markdown-satteri';
import idsSemAcento from './src/lib/ids-sem-acento.mjs';

// Adapter da Vercel: só /api/formulario roda no servidor; todas as páginas continuam estáticas.
// SITE_URL vem do ambiente de deploy (ex.: https://seudominio.com.br).
// Enquanto o domínio não existe, usamos um endereço provisório: ele só afeta
// canonical, sitemap e links absolutos.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://quintadodesabafo.exemplo',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      // Imagens OG, 404 e páginas de retorno dos formulários não entram no sitemap
      filter: (pagina) => !/\/(og|404|obrigado|obrigado-tema|envio-falhou)(\/|$)/.test(new URL(pagina).pathname),
    }),
  ],
  // Recusa envio de formulário vindo de outro site
  security: { checkOrigin: true },
  // CSS embutido no HTML: o site é pequeno e isso elimina requisições que bloqueiam a renderização
  build: { inlineStylesheets: 'always' },
  markdown: {
    // O MDX herda este processador
    processor: satteri({ hastPlugins: [idsSemAcento] }),
  },
});
