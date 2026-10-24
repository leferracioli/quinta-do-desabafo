// Gera as imagens de compartilhamento (1200×630) na identidade visual:
// fundo carvão, título em Fraunces com a palavra de destaque em itálico laranja,
// foto da Letícia no arco. Roda só no build (satori → SVG → PNG com resvg).
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const C = { carvao: '#2a2a2c', areia: '#efeae3', laranja: '#e0662f', taupe: '#a89f94', pedra: '#cfc7bc' };

// Caminhos a partir da raiz do projeto (o build roda nela)
const raiz = (...partes: string[]) => join(process.cwd(), ...partes);

// satori não lê woff2 nem fontes variáveis: usamos os .woff estáticos
const fonte = (pacote: string, arquivo: string) =>
  readFile(raiz('node_modules', '@fontsource', pacote, 'files', arquivo));

let cache: Promise<{ fontes: any[]; foto: string }> | undefined;
function recursos() {
  cache ??= (async () => {
    const [frauncesN, frauncesI, jost] = await Promise.all([
      fonte('fraunces', 'fraunces-latin-500-normal.woff'),
      fonte('fraunces', 'fraunces-latin-500-italic.woff'),
      fonte('jost', 'jost-latin-500-normal.woff'),
    ]);
    const png = await sharp(raiz('src', 'assets', 'leticia-recorte.webp'))
      .resize({ width: 420 })
      .png()
      .toBuffer();
    return {
      fontes: [
        { name: 'Fraunces', data: frauncesN, weight: 500, style: 'normal' },
        { name: 'Fraunces', data: frauncesI, weight: 500, style: 'italic' },
        { name: 'Jost', data: jost, weight: 500, style: 'normal' },
      ],
      foto: `data:image/png;base64,${png.toString('base64')}`,
    };
  })();
  return cache;
}

const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

interface DadosOg {
  kicker: string;
  titulo: string;
  destaque?: string;
}

export async function gerarOg({ kicker, titulo, destaque }: DadosOg): Promise<Buffer> {
  const { fontes, foto } = await recursos();

  // Cada palavra vira um bloco (satori quebra linha por flex-wrap); a de destaque fica em itálico laranja
  const palavras = titulo.split(' ').map((p) => {
    const limpa = p.replace(/[?!.,:;]/g, '');
    const ehDestaque = destaque && limpa === destaque;
    if (!ehDestaque) return el('span', { marginRight: 18 }, p);
    const sobra = p.slice(limpa.length);
    return el('span', { display: 'flex', marginRight: 18 }, [
      el('span', { fontStyle: 'italic', color: C.laranja }, limpa),
      ...(sobra ? [el('span', {}, sobra)] : []),
    ]);
  });
  const tamanho = titulo.length > 60 ? 62 : titulo.length > 40 ? 72 : 84;

  const arvore = el(
    'div',
    {
      // satori soma padding e borda ao tamanho (content-box): as medidas abaixo já descontam isso
      width: 1200, height: 624, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      background: C.carvao, color: C.areia,
      borderTop: `6px solid ${C.laranja}`, // fio laranja no topo, como a barra de progresso
    },
    [
      // Coluna de texto: kicker em cima, título no meio, assinatura embaixo
      el('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 760, height: 510, marginLeft: 72, padding: '58px 0 56px' }, [
        el('div', { display: 'flex', fontFamily: 'Jost', fontSize: 22, letterSpacing: 3, color: C.taupe, textTransform: 'uppercase' }, kicker),
        el('div', { display: 'flex', flexWrap: 'wrap', fontFamily: 'Fraunces', fontSize: tamanho, lineHeight: 1.08, letterSpacing: -1 }, palavras),
        el('div', { display: 'flex', fontFamily: 'Jost', fontSize: 24, color: C.areia }, [
          el('span', {}, 'Letícia Ferracioli'),
          el('span', { color: C.taupe, marginLeft: 12 }, '· @leferracioli'),
        ]),
      ]),
      // Arco com a foto, apoiado na base da imagem
      el('div', {
        display: 'flex', width: 280, height: 400, marginRight: 72, overflow: 'hidden',
        borderRadius: '140px 140px 0 0', backgroundImage: `linear-gradient(165deg, ${C.pedra}, ${C.taupe})`,
      }, [
        { type: 'img', props: { src: foto, width: 292, height: 519, style: { marginLeft: -6, marginTop: -2 } } },
      ]),
    ]
  );

  const svg = await satori(arvore as any, { width: 1200, height: 630, fonts: fontes });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
