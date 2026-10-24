// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import idsSemAcento from './src/lib/ids-sem-acento.mjs';

// SITE_URL vem do ambiente de deploy (ex.: https://seudominio.com.br).
// Enquanto o domínio não existe, usamos um endereço provisório: ele só afeta
// canonical, sitemap e links absolutos.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://quintadodesabafo.exemplo',
  integrations: [
    mdx(),
    sitemap({
      // As imagens OG e a 404 não entram no sitemap
      filter: (pagina) => !pagina.includes('/og/') && !pagina.endsWith('/404/'),
    }),
  ],
  // CSS embutido no HTML: o site é pequeno e isso elimina requisições que bloqueiam a renderização
  build: { inlineStylesheets: 'always' },
  markdown: {
    // O MDX herda este processador
    processor: satteri({ hastPlugins: [idsSemAcento] }),
  },
});
