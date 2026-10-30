// Textos das soluções (home, /solucoes, dados estruturados e llms.txt). Edite à vontade: é só texto.
import { OFERTA } from './diagnostico';
import { SITE } from './site';

const zap = (mensagem: string) => `${SITE.whatsapp.split('?')[0]}?text=${encodeURIComponent(mensagem)}`;

// ---------------------------------------------------------------------------
// Mentoria e consultoria: os serviços (aparecem na home e viram "Service" no Google)
// ---------------------------------------------------------------------------
export interface Solucao {
  id: 'mentoria' | 'consultoria';
  nome: string;
  destaque: string; // palavra do nome em itálico laranja
  paraQuem: string;
  resumo: string;
  temas: string[];
}

export const SOLUCOES: Solucao[] = [
  {
    id: 'mentoria',
    nome: 'Mentoria comercial',
    destaque: 'Mentoria',
    paraQuem: 'Para quem virou líder porque vendia bem e descobriu que liderar é outro trabalho.',
    resumo:
      'Um espaço para pensar junto as decisões da liderança comercial: o que acompanhar, como cobrar sem virar só cobrança, como dar feedback e como organizar a semana para não viver apagando incêndio.',
    temas: ['Rotina de gestão do time', 'Indicadores e metas que fazem sentido', 'Feedback e desenvolvimento de cada pessoa', 'CRM e automações a favor da liderança'],
  },
  {
    id: 'consultoria',
    nome: 'Consultoria comercial',
    destaque: 'Consultoria',
    paraQuem: 'Para empresas em que o resultado depende de poucas pessoas fazendo muito, cada uma do seu jeito.',
    resumo:
      'Um olhar de fora sobre a operação inteira, do primeiro contato com o lead ao pós-venda: onde a venda escapa, o que está desconectado e qual jeito de trabalhar o time consegue sustentar. E a organização disso junto com você.',
    temas: ['Processo e funil de vendas', 'Indicadores e acompanhamento', 'CRM e automações', 'Integração entre marketing e vendas'],
  },
];

// ---------------------------------------------------------------------------
// E-book (preencha: enquanto algum campo estiver null, a página mostra o campo pendente
// e o site não vai ao ar com ele)
// ---------------------------------------------------------------------------
export const EBOOK = {
  nome: 'Follow-up que Fecha' as string | null,
  destaque: 'Fecha' as string | null, // palavra do nome em itálico laranja
  paraQuem: 'Para quem vende por conversa (WhatsApp, Direct, e-mail ou telefone), manda a proposta e fica esperando uma resposta que não vem.' as string | null,
  promessa: 'A venda não se perde no “não”. Se perde no silêncio.',
  resumo: 'Um guia direto para voltar melhor, não para insistir mais: por que o lead some, uma cadência pronta do primeiro contato ao dia 30 e 28 mensagens prontas para cada situação.' as string | null,
  conteudo: [
    'As 4 causas do silêncio e a mensagem que cada uma pede',
    'As 4 regras do follow-up que não irrita',
    'Uma cadência pronta, do primeiro contato ao dia 30',
    '28 mensagens prontas por situação: “vou pensar”, “tá caro”, “vou ver com meu sócio”, visualizou e não respondeu…',
    'Áudio, texto ou ligação: o canal certo para cada momento',
    'Os 8 erros que matam a venda e um checklist de bolso para consultar antes de enviar',
  ] as string[],
  bonus: {
    titulo: 'Bônus: Planilha de Medição',
    texto: 'Prove o seu antes e depois. Você registra as suas últimas 50 conversas e a planilha calcula sozinha a velocidade de resposta, a cobertura de follow-up e a conversão, com a variação entre os dois períodos.',
  },
  formato: 'E-book digital de 31 páginas + planilha de medição. Acesso imediato depois da compra. Preço de lançamento: de R$ 47 por R$ 37, ou em até 12x.',
  preco: 'R$ 37' as string | null, // atualize quando o preço de lançamento acabar (e o texto do formato acima)
  link: 'https://pay.hotmart.com/N108268511M?off=in08d13u' as string | null, // checkout da Hotmart
};

// ---------------------------------------------------------------------------
// A escada de soluções da página /solucoes (do gratuito ao acompanhamento)
// ---------------------------------------------------------------------------
export interface Degrau {
  id: string;
  nome: string;
  destaque: string;
  etapa: string; // linha curta acima do nome: preço/formato
  paraQuem: string;
  promessa: string; // a frase grande
  resumo: string;
  entregas: string[];
  tituloEntregas: string;
  formato: string;
  bonus?: { titulo: string; texto: string };
  cta: { texto: string; href: string; externo: boolean };
}

const [mentoria, consultoria] = SOLUCOES;

export const DEGRAUS: Degrau[] = [
  {
    id: 'diagnostico',
    nome: 'Diagnóstico comercial',
    destaque: 'Diagnóstico',
    etapa: 'Gratuito · 4 minutos',
    paraQuem: 'Para quem sente que o comercial poderia render mais, mas não sabe dizer exatamente onde está o problema.',
    promessa: 'Descubra em 4 minutos onde a sua operação trava.',
    resumo: '21 perguntas sobre leads, processo, follow-up, CRM, indicadores, rotina, pessoas e automação. No fim, um gráfico com os pontos fortes e fracos da sua operação.',
    tituloEntregas: 'O que você recebe',
    entregas: ['A nota geral e o nível da sua operação', 'O gráfico de teia com as 8 áreas', 'Os gargalos prioritários, com um primeiro passo para cada um'],
    formato: 'Online, na hora e gratuito.',
    cta: { texto: 'Fazer o diagnóstico', href: '/diagnostico/', externo: false },
  },
  {
    id: 'ebook',
    nome: EBOOK.nome ?? 'E-book',
    destaque: EBOOK.destaque ?? 'E-book',
    etapa: EBOOK.preco ? `${EBOOK.preco} · e-book + planilha bônus` : 'E-book + planilha bônus',
    paraQuem: EBOOK.paraQuem ?? '',
    promessa: EBOOK.promessa,
    resumo: EBOOK.resumo ?? '',
    tituloEntregas: 'O que tem dentro',
    entregas: EBOOK.conteudo,
    bonus: EBOOK.bonus,
    formato: EBOOK.formato,
    cta: { texto: 'Quero o e-book', href: EBOOK.link ?? '#', externo: true },
  },
  {
    id: 'direcionamento',
    nome: OFERTA.nome,
    destaque: OFERTA.destaque,
    etapa: 'Uma conversa · 60 minutos',
    paraQuem: 'Para quem já sabe onde dói e quer saber por onde começar.',
    promessa: 'Saia com um plano de 90 dias, não com mais uma lista de ideias.',
    resumo: 'Uma conversa por vídeo, a partir do seu diagnóstico. A gente entende por que os gargalos acontecem e em que ordem atacar, para você não gastar energia mexendo no lugar errado.',
    tituloEntregas: 'Como funciona',
    entregas: OFERTA.itens,
    formato: OFERTA.preco ? `Videochamada de 60 minutos · ${OFERTA.preco}` : 'Videochamada de 60 minutos. Investimento e agenda pelo WhatsApp.',
    cta: { texto: 'Quero a sessão', href: zap(`Oi, Letícia! Quero saber sobre a ${OFERTA.nome}.`), externo: true },
  },
  {
    id: mentoria.id,
    nome: mentoria.nome,
    destaque: mentoria.destaque,
    etapa: 'Acompanhamento · para quem lidera',
    paraQuem: mentoria.paraQuem,
    promessa: 'Pare de ser o melhor vendedor do time e passe a ser quem faz o time vender.',
    resumo: mentoria.resumo,
    tituloEntregas: 'O que a gente trabalha',
    entregas: mentoria.temas,
    formato: 'Encontros online. Frequência e duração combinadas na primeira conversa.',
    cta: { texto: 'Quero conversar sobre a mentoria', href: zap('Oi, Letícia! Tenho interesse na Mentoria comercial.'), externo: true },
  },
  {
    id: consultoria.id,
    nome: consultoria.nome,
    destaque: consultoria.destaque,
    etapa: 'Projeto · para a operação inteira',
    paraQuem: consultoria.paraQuem,
    promessa: 'Um comercial que funciona sem depender de herói.',
    resumo: consultoria.resumo,
    tituloEntregas: 'O que a gente trabalha',
    entregas: consultoria.temas,
    formato: 'Projeto sob medida, desenhado depois de uma conversa inicial.',
    cta: { texto: 'Quero conversar sobre a consultoria', href: zap('Oi, Letícia! Tenho interesse na Consultoria comercial.'), externo: true },
  },
];
