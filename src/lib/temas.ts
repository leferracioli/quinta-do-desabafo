// Temas aceitos no frontmatter (campo "tema"). Para criar um tema novo, adicione aqui.
export const TEMAS = ['vendas', 'gestão comercial', 'IA em vendas', 'marketing digital'] as const;
export type Tema = (typeof TEMAS)[number];
