// Plugin do processador de Markdown do Astro (Sätteri) que gera os ids dos
// intertítulos sem acento, para links e índice ficarem limpos:
// "Os vendedores já estão usando agentes?" -> #os-vendedores-ja-estao-usando-agentes
// O plugin de ids do próprio Astro respeita o id já definido aqui.

export function slugSemAcento(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function idsSemAcento() {
  const usados = new Map();
  return {
    name: 'ids-sem-acento',
    element: {
      filter: ['h2', 'h3', 'h4'],
      visit(no, ctx) {
        if (typeof no.properties?.id === 'string') return;
        let id = slugSemAcento(ctx.textContent(no));
        const repeticoes = usados.get(id) ?? 0;
        usados.set(id, repeticoes + 1);
        if (repeticoes) id += `-${repeticoes}`;
        ctx.setProperty(no, 'id', id);
      },
    },
  };
}
