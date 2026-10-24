// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import idsSemAcento from './src/lib/ids-sem-acento.mjs';

// SITE_URL vem do ambiente de deploy (ex.: https://seudominio.com.br).
// Enquanto o domínio não existe, usamos um endereço provisório: ele só afeta
// canonical, sitemap e links absolutos.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://quintadodesabafo.exemplo',
  integrations: [mdx()],
  markdown: {
    // O MDX herda este processador
    processor: satteri({ hastPlugins: [idsSemAcento] }),
  },
});
