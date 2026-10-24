// Schema dos artigos (frontmatter validado no build).
// Se algum campo estiver errado, o build para com uma mensagem em português.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TEMAS } from './lib/temas';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artigos' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string().max(155, 'A description passou de 155 caracteres'),
        slug: z.string().regex(/^[a-z0-9-]+$/, 'O slug só aceita letras minúsculas, números e hífen'),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        edicao: z.number().int().positive(), // número sequencial do Desabafo
        palavraChave: z.string(),
        variacoes: z.array(z.string()).default([]),
        tema: z.enum(TEMAS),
        palavraDestaque: z.string(), // palavra do título em itálico laranja
        resumoDireto: z.string(), // as 2–3 frases da resposta direta (lead)
        capa: image().optional(),
        capaAlt: z.string().optional(),
        faq: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).default([]),
        fontes: z.array(z.object({ titulo: z.string(), url: z.url().optional() })).default([]),
        draft: z.boolean().default(false), // rascunho aparece só no `npm run dev`
      })
      .superRefine((d, ctx) => {
        if (!d.title.includes(d.palavraDestaque)) {
          ctx.addIssue({ code: 'custom', path: ['palavraDestaque'], message: `"${d.palavraDestaque}" não aparece no title` });
        }
        if (d.capa && !d.capaAlt) {
          ctx.addIssue({ code: 'custom', path: ['capaAlt'], message: 'Toda capa precisa de capaAlt (texto alternativo)' });
        }
        // Artigo publicado não pode ter fonte sem link
        if (!d.draft) {
          d.fontes.forEach((f, i) => {
            if (!f.url) ctx.addIssue({ code: 'custom', path: ['fontes', i, 'url'], message: 'Fonte sem link: preencha antes de publicar' });
          });
        }
      }),
});

export const collections = { artigos };
