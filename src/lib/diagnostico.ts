// Diagnóstico comercial (/diagnostico/): perguntas, cálculo, textos do relatório e o gráfico de teia.
// Tudo que é texto pode ser editado aqui. Estrutura completa em diagnostico-comercial.md.

// ---------------------------------------------------------------------------
// A oferta que o relatório conduz (edite à vontade)
// ---------------------------------------------------------------------------
export const OFERTA = {
  nome: 'Sessão de Direcionamento Comercial',
  destaque: 'Direcionamento',
  resumo: 'Uma conversa de 60 minutos comigo, por vídeo, a partir do seu diagnóstico.',
  itens: [
    'Antes da conversa, eu leio as suas respostas e o seu gráfico.',
    'Na conversa, a gente entende por que os gargalos acontecem e em que ordem atacar.',
    'Você sai com um plano de 90 dias: até 3 prioridades e o primeiro passo de cada uma.',
  ],
  // Preço exibido no relatório. null = "Investimento e agenda pelo WhatsApp".
  preco: null as string | null,
  botao: 'Quero a sessão de direcionamento',
};

// ---------------------------------------------------------------------------
// Bloco A · contexto
// ---------------------------------------------------------------------------
export interface PerguntaContexto { id: string; texto: string; opcoes: string[] }

export const CONTEXTO: PerguntaContexto[] = [
  { id: 'papel', texto: 'Qual é o seu papel?', opcoes: ['Dono(a) ou sócio(a)', 'Gestor(a) ou supervisor(a) comercial', 'Vendedor(a)', 'Outro'] },
  { id: 'time', texto: 'Quantas pessoas vendem no time?', opcoes: ['Só eu', '2 a 5', '6 a 15', 'Mais de 15'] },
  { id: 'modelo', texto: 'Vocês vendem para…', opcoes: ['Empresas (B2B)', 'Consumidor final (B2C)', 'Os dois'] },
  { id: 'canal', texto: 'Por onde acontece a maior parte das vendas?', opcoes: ['WhatsApp', 'Telefone', 'Presencial', 'E-mail ou LinkedIn'] },
  // As opções desta pergunta seguem a ordem de EIXOS (uma por eixo): alimenta "percepção × diagnóstico"
  {
    id: 'percepcao',
    texto: 'Onde você acha que está o maior problema hoje?',
    opcoes: [
      'Chegam poucos leads, ou leads ruins',
      'Cada vendedor vende de um jeito',
      'Os leads esfriam antes do contato ou somem no follow-up',
      'Ninguém atualiza o CRM (ou nem temos um)',
      'Não sei bem quais números olhar, ou a meta não fecha',
      'Passo o dia apagando incêndio',
      'O time precisa de treinamento e acompanhamento',
      'Muito trabalho manual e repetitivo',
    ],
  },
];

// ---------------------------------------------------------------------------
// Bloco B · os 8 eixos (2 perguntas cada; alternativas valem 0, 1, 2 e 3)
// ---------------------------------------------------------------------------
interface Leitura { acontece: string; custo: string; passo: string }
export interface Eixo {
  id: string;
  nome: string;
  curto: string; // rótulo no gráfico
  perguntas: { texto: string; opcoes: [string, string, string, string] }[];
  textos: { gargalo: Leitura; construcao: Leitura; forte: Leitura };
}

export const EIXOS: Eixo[] = [
  {
    id: 'leads', nome: 'Leads e marketing', curto: 'Leads',
    perguntas: [
      { texto: 'De onde vêm as oportunidades hoje?', opcoes: ['Quase só de indicação e de quem procura por conta própria', 'Fazemos marketing, mas o volume oscila muito', 'Temos canais definidos e sabemos quantos leads cada um traz', 'Sabemos quantos leads cada canal traz e quantos viram venda'] },
      { texto: 'Marketing e vendas combinaram o que é um lead qualificado?', opcoes: ['Não existe essa definição', 'Existe na cabeça de algumas pessoas', 'Está escrita, mas pouca gente segue', 'Está escrita, é seguida e revisada com dados'] },
    ],
    textos: {
      gargalo: { acontece: 'As oportunidades chegam por indicação ou por acaso, e ninguém sabe dizer de onde virá o próximo mês. Quando chega lead, nem sempre é o cliente certo.', custo: 'O time alterna entre ociosidade e correria, e o resultado oscila sem que se saiba por quê.', passo: 'Liste de onde vieram as últimas 20 vendas. Esse é o seu canal de verdade, e talvez não seja o que recebe mais atenção.' },
      construcao: { acontece: 'Existem canais ativos, mas o volume oscila e a qualidade dos leads ainda gera discussão entre marketing e vendas.', custo: 'Parte do esforço comercial vai para leads que nunca iam comprar.', passo: 'Escreva, com o time, três critérios que separam um lead bom de um ruim e passe a marcar isso no CRM.' },
      forte: { acontece: 'Você sabe de onde vêm as oportunidades e quais canais trazem venda, não só volume.', custo: 'O risco aqui é a dependência: um canal que funciona hoje pode mudar de regra amanhã.', passo: 'Revise uma vez por mês a conversão de cada canal, para agir antes que um deles caia.' },
    },
  },
  {
    id: 'processo', nome: 'Processo e funil', curto: 'Processo',
    perguntas: [
      { texto: 'As etapas da venda estão definidas?', opcoes: ['Cada vendedor vende do seu jeito', 'Temos etapas, sem critério para passar de uma para outra', 'Etapas com critérios, seguidas pela maioria', 'Etapas e critérios claros, revisados quando os números mudam'] },
      { texto: 'Quando uma venda é perdida…', opcoes: ['Ninguém registra o motivo', 'Às vezes registra, sem padrão', 'Sempre registra, com motivos padronizados', 'Registra e usa os motivos para mudar o processo ou a oferta'] },
    ],
    textos: {
      gargalo: { acontece: 'Cada vendedor conduz a venda do seu jeito, e não há critério claro para dizer em que etapa uma negociação está.', custo: 'Fica impossível saber o que funciona, replicar o melhor vendedor ou prever o fechamento do mês.', passo: 'Desenhe as etapas da sua venda numa folha, com uma frase dizendo o que precisa acontecer para passar de uma para a outra.' },
      construcao: { acontece: 'Existem etapas, mas os critérios ainda são interpretados de jeitos diferentes, e os motivos de perda não viram aprendizado.', custo: 'O funil parece cheio, mas parte das oportunidades está parada na etapa errada.', passo: 'Escolha os 5 motivos de perda mais comuns e torne o campo obrigatório ao perder uma venda.' },
      forte: { acontece: 'O time segue um processo com critérios claros e usa os motivos de perda para ajustar o caminho.', custo: 'Processo bom envelhece: o que funcionava há um ano pode estar travando hoje.', passo: 'Revise o processo a cada trimestre, começando pela etapa com a menor conversão.' },
    },
  },
  {
    id: 'velocidade', nome: 'Velocidade e follow-up', curto: 'Follow-up',
    perguntas: [
      { texto: 'Em quanto tempo um lead novo recebe o primeiro contato?', opcoes: ['Não sei', 'Mais de 24 horas', 'No mesmo dia', 'Em menos de 1 hora'] },
      { texto: 'Como funciona o follow-up?', opcoes: ['Depende da memória de cada um', 'Existe uma orientação, mas ninguém acompanha', 'Existe uma cadência definida, com tarefas', 'Cadência definida, acompanhada e ajustada pelos resultados'] },
    ],
    textos: {
      gargalo: { acontece: 'O primeiro contato demora (ou ninguém sabe quanto demora), e o follow-up depende da memória de cada vendedor.', custo: 'Lead que espera esfria, e venda sem follow-up costuma morrer em silêncio, sem nem aparecer no motivo de perda.', passo: 'Meça, nesta semana, quanto tempo cada lead novo leva para receber o primeiro contato. Só medir já muda o comportamento do time.' },
      construcao: { acontece: 'O primeiro contato acontece no mesmo dia e existe uma orientação de follow-up, mas ninguém acompanha se ela é seguida.', custo: 'Os leads que chegam fora do horário ou num dia cheio são os primeiros a esfriar.', passo: 'Defina uma cadência simples (por exemplo, 4 contatos em 10 dias) e crie as tarefas automaticamente no CRM.' },
      forte: { acontece: 'O lead é atendido rápido e acompanhado com uma cadência definida e ajustada pelos resultados.', custo: 'O risco é a cadência virar robô: velocidade sem contexto também afasta.', passo: 'Revise as mensagens da cadência com quem mais converte no time e personalize os primeiros contatos.' },
    },
  },
  {
    id: 'crm', nome: 'CRM e dados', curto: 'CRM',
    perguntas: [
      { texto: 'Como o time usa o CRM?', opcoes: ['Não temos CRM (planilha, caderno ou WhatsApp)', 'Temos, mas é preenchido depois, quando dá', 'A maioria atualiza no mesmo dia', 'É onde o trabalho acontece; dá para confiar nos dados'] },
      { texto: 'Se você precisar saber agora quantas oportunidades estão abertas e em qual etapa…', opcoes: ['Pergunto para cada vendedor', 'Levo horas montando uma planilha', 'Consigo em alguns minutos', 'Abro um painel e está lá'] },
    ],
    textos: {
      gargalo: { acontece: 'O CRM não existe ou é preenchido depois, quando dá. A informação real está no WhatsApp e na cabeça de cada vendedor.', custo: 'Quando um vendedor sai, as negociações vão junto. E qualquer número que a gestão olha pode estar errado.', passo: 'Combine uma regra única: a reunião de acompanhamento só olha o que está no CRM.' },
      construcao: { acontece: 'A maioria atualiza o CRM, mas ainda dá trabalho montar uma visão confiável do funil.', custo: 'A gestão gasta horas consolidando dados em vez de agir sobre eles.', passo: 'Monte um painel simples com as oportunidades abertas por etapa e use só ele na próxima reunião.' },
      forte: { acontece: 'O CRM é onde o trabalho acontece, e dá para confiar no que está registrado.', custo: 'Com a base sólida, o desperdício passa a ser não usar os dados para decidir.', passo: 'Escolha uma pergunta de negócio por mês (por exemplo, qual canal fecha mais rápido?) e responda com os dados do CRM.' },
    },
  },
  {
    id: 'indicadores', nome: 'Indicadores e metas', curto: 'Indicadores',
    perguntas: [
      { texto: 'Quais números você acompanha toda semana?', opcoes: ['Só faturamento ou número de vendas', 'Vendas e alguma atividade (ligações, reuniões)', 'A conversão entre as etapas do funil', 'Conversão por etapa, canal e vendedor, com ciclo e ticket'] },
      { texto: 'Como a meta é definida?', opcoes: ['É um número que vem de cima', 'Ano anterior mais um percentual', 'A partir da capacidade do time e das taxas de conversão', 'Pela capacidade e conversão, desdobrada por vendedor e revisada no meio do mês'] },
    ],
    textos: {
      gargalo: { acontece: 'A gestão olha o resultado (faturamento, número de vendas), mas não os números que explicam o resultado. A meta vem de cima, sem base.', custo: 'O problema só aparece no fim do mês, quando já não dá para corrigir.', passo: 'Calcule a conversão entre cada etapa do funil nos últimos 3 meses. É o primeiro mapa de onde a venda escapa.' },
      construcao: { acontece: 'Você acompanha atividade e algum indicador de conversão, mas a meta ainda não nasce da capacidade real do time.', custo: 'Meta que não fecha com a capacidade desmotiva e vira pressão sem direção.', passo: 'Faça a conta de trás para frente: quantas reuniões e quantos leads a meta exige, com as suas taxas de conversão reais.' },
      forte: { acontece: 'Os números certos estão na mesa: conversão por etapa, canal e vendedor, com metas desdobradas.', custo: 'O risco é ter número demais e conversa de menos.', passo: 'Escolha 3 indicadores que guiam a semana e deixe o resto para a análise mensal.' },
    },
  },
  {
    id: 'rotina', nome: 'Rotina de gestão', curto: 'Rotina',
    perguntas: [
      { texto: 'Como são as reuniões com o time?', opcoes: ['Só quando tem problema', 'Acontecem, mas viram cobrança de número', 'Têm pauta fixa e olham o funil', 'Têm pauta, olham o funil e terminam com combinados cobrados na semana seguinte'] },
      { texto: 'Quanto do tempo da gestão vai para apagar incêndio?', opcoes: ['Quase todo', 'Mais da metade', 'Uma parte, mas sobra tempo para acompanhar o time', 'Pouco: a rotina dá conta do dia a dia'] },
    ],
    textos: {
      gargalo: { acontece: 'A gestão vive apagando incêndio, e as reuniões acontecem quando dá problema ou viram cobrança de número.', custo: 'O gestor vira o melhor vendedor do time, e o time para de crescer junto.', passo: 'Bloqueie na agenda 30 minutos por semana com uma pauta fixa: funil, travas e combinados da semana.' },
      construcao: { acontece: 'Existe uma rotina de reuniões, mas ela ainda gira em torno de cobrança e os combinados se perdem.', custo: 'O time sai da reunião sem saber o que muda na prática.', passo: 'Termine toda reunião com no máximo 3 combinados, cada um com dono e prazo, e comece a próxima por eles.' },
      forte: { acontece: 'A rotina de gestão dá conta do dia a dia, com pauta, funil e combinados acompanhados.', custo: 'Rotina boa pode virar ritual: o risco é a reunião acontecer só por acontecer.', passo: 'Pergunte ao time, uma vez por trimestre, o que tirar e o que manter nas reuniões.' },
    },
  },
  {
    id: 'pessoas', nome: 'Pessoas e desenvolvimento', curto: 'Pessoas',
    perguntas: [
      { texto: 'Um vendedor novo…', opcoes: ['Aprende olhando os outros', 'Recebe uma apresentação e já começa a vender', 'Tem um roteiro de integração e acompanhamento nas primeiras semanas', 'Tem integração, metas de rampa e uma avaliação no fim'] },
      { texto: 'Como acontece o feedback individual?', opcoes: ['Só quando algo dá errado', 'Informal, sem frequência', 'Conversas individuais com frequência definida', 'Frequência definida, com plano de desenvolvimento acompanhado'] },
    ],
    textos: {
      gargalo: { acontece: 'Quem chega aprende olhando os outros, e o feedback só aparece quando algo dá errado.', custo: 'Cada contratação demora mais para render, e quem é bom tende a buscar outro lugar para crescer.', passo: 'Escreva a primeira semana do vendedor novo: o que ele precisa saber, ver e fazer, dia a dia.' },
      construcao: { acontece: 'Existe alguma integração e algumas conversas individuais, mas sem frequência nem plano de desenvolvimento.', custo: 'O desenvolvimento do time depende da boa vontade do gestor na semana.', passo: 'Marque uma conversa individual de 20 minutos a cada 15 dias com cada pessoa e registre um combinado por conversa.' },
      forte: { acontece: 'O time tem integração estruturada, metas de rampa e acompanhamento individual.', custo: 'O próximo nível é transformar os melhores em multiplicadores.', passo: 'Peça para quem tem o melhor resultado mostrar como conduz uma etapa e use isso na integração de quem chega.' },
    },
  },
  {
    id: 'automacao', nome: 'Automação e IA', curto: 'Automação',
    perguntas: [
      { texto: 'Tarefas repetitivas (registrar no CRM, confirmar reunião, lembretes)…', opcoes: ['Tudo manual', 'Algumas automações soltas', 'As principais estão automatizadas', 'Automatizadas e revisadas; o time gasta o tempo conversando com cliente'] },
      { texto: 'Como o time usa IA?', opcoes: ['Não usamos', 'Cada um usa por conta própria, sem orientação', 'Em tarefas definidas, com algum cuidado', 'Com regras claras, treinamento e medindo o efeito'] },
    ],
    textos: {
      gargalo: { acontece: 'Tudo é manual, e a IA é usada por conta de cada um, quando é usada.', custo: 'O time gasta com digitação e lembretes o tempo que poderia estar conversando com cliente.', passo: 'Liste as 3 tarefas repetitivas que mais tomam tempo do time. Comece automatizando a confirmação de reunião.' },
      construcao: { acontece: 'Algumas automações existem e a IA aparece em tarefas pontuais, ainda sem regra nem medição.', custo: 'Ferramenta sem regra cria retrabalho e pode afastar o cliente quando ele percebe o robô.', passo: 'Defina por escrito onde a IA pode atuar (pesquisa, rascunho, registro) e onde o contato é sempre humano.' },
      forte: { acontece: 'As tarefas repetitivas estão automatizadas e a IA é usada com regra, treinamento e medição.', custo: 'O risco agora é empilhar ferramentas que ninguém revisa.', passo: 'Revise a cada trimestre o que cada automação entrega e desligue o que não se paga.' },
    },
  },
];

// Combinações de gargalos (as duas áreas abaixo de 50)
export const COMBINACOES: { eixos: [string, string]; titulo: string; texto: string }[] = [
  { eixos: ['crm', 'indicadores'], titulo: 'Decidindo no escuro', texto: 'Sem dado confiável no CRM, os indicadores não fecham, e as decisões viram opinião. Antes de qualquer meta nova, o primeiro trabalho é fazer o número existir.' },
  { eixos: ['automacao', 'crm'], titulo: 'Automatizar a bagunça', texto: 'Automação e IA em cima de dado bagunçado só aceleram a bagunça. A base vem antes da ferramenta.' },
  { eixos: ['processo', 'pessoas'], titulo: 'Cada um por si', texto: 'Sem um processo claro, não há o que ensinar a quem chega. O vendedor novo aprende o jeito de quem senta ao lado, com os acertos e os vícios.' },
  { eixos: ['leads', 'velocidade'], titulo: 'Torneira aberta, ralo aberto', texto: 'Os leads já são poucos ou instáveis, e parte deles esfria antes do contato. Antes de investir em gerar mais, vale fechar o ralo.' },
  { eixos: ['rotina', 'indicadores'], titulo: 'Gestão no feeling', texto: 'Sem os números certos na mão, a reunião vira cobrança e o dia vira incêndio. A rotina de gestão precisa de um painel para conduzir.' },
];

export const NIVEIS = [
  { min: 80, nome: 'Pronta para escalar', destaque: 'escalar', texto: 'Processo, dados e gestão funcionam juntos. O desafio agora é crescer sem perder o que já funciona.' },
  { min: 60, nome: 'Estruturada', destaque: 'Estruturada', texto: 'A operação tem método. O próximo salto vem de fazer as áreas conversarem entre si e de usar os números para decidir antes do problema aparecer.' },
  { min: 40, nome: 'Em construção', destaque: 'construção', texto: 'Já existe uma base, mas ela ainda não se sustenta sozinha: quando o gestor sai de perto ou o volume aumenta, as coisas escorregam.' },
  { min: 0, nome: 'Operação no improviso', destaque: 'improviso', texto: 'Hoje, o resultado depende mais do esforço de cada pessoa do que de um jeito de trabalhar. É também a fase em que poucas mudanças bem escolhidas fazem mais diferença.' },
];

// ---------------------------------------------------------------------------
// Cálculo
// ---------------------------------------------------------------------------
export const TOTAL_PERGUNTAS = CONTEXTO.length + EIXOS.length * 2; // 21

// Em empate, vence o eixo que mais trava os outros
const PRIORIDADE = ['crm', 'processo', 'indicadores', 'rotina', 'velocidade', 'leads', 'pessoas', 'automacao'];

export type Faixa = 'gargalo' | 'construcao' | 'forte';
export const faixa = (nota: number): Faixa => (nota < 40 ? 'gargalo' : nota < 70 ? 'construcao' : 'forte');

export interface Resultado {
  contexto: number[];
  notas: { eixo: Eixo; nota: number; faixa: Faixa }[];
  geral: number;
  nivel: (typeof NIVEIS)[number];
  fortes: Resultado['notas'];
  gargalos: Resultado['notas'];
  combinacoes: typeof COMBINACOES;
  percebido: Eixo;
}

/** respostas: as 21 respostas na ordem (5 de contexto + 16 do diagnóstico) */
export function calcular(respostas: number[]): Resultado {
  const contexto = respostas.slice(0, CONTEXTO.length);
  const notas = EIXOS.map((eixo, i) => {
    const a = respostas[CONTEXTO.length + i * 2] ?? 0;
    const b = respostas[CONTEXTO.length + i * 2 + 1] ?? 0;
    const nota = Math.round(((a + b) / 6) * 100);
    return { eixo, nota, faixa: faixa(nota) };
  });
  const geral = Math.round(notas.reduce((s, n) => s + n.nota, 0) / notas.length);
  const nivel = NIVEIS.find((n) => geral >= n.min)!;
  const prioridade = (id: string) => PRIORIDADE.indexOf(id);
  const crescente = [...notas].sort((x, y) => x.nota - y.nota || prioridade(x.eixo.id) - prioridade(y.eixo.id));
  const abaixo = crescente.filter((n) => n.nota < 70);
  const gargalos = (abaixo.length ? abaixo : crescente).slice(0, abaixo.length >= 3 ? 3 : 2);
  const fortes = [...notas].sort((x, y) => y.nota - x.nota || prioridade(y.eixo.id) - prioridade(x.eixo.id)).slice(0, 2);
  const nota = (id: string) => notas.find((n) => n.eixo.id === id)!.nota;
  const combinacoes = COMBINACOES.filter((c) => nota(c.eixos[0]) < 50 && nota(c.eixos[1]) < 50).slice(0, 2);
  const percebido = EIXOS[contexto[4] ?? 0] ?? EIXOS[0];
  return { contexto, notas, geral, nivel, fortes, gargalos, combinacoes, percebido };
}

// Código do relatório: "1" + uma letra por resposta (0–9). Vai no link e na planilha.
export const codificar = (respostas: number[]) => '1' + respostas.map((r) => String(r)).join('');
export function decodificar(codigo: string): number[] | null {
  if (!/^1\d+$/.test(codigo) || codigo.length !== TOTAL_PERGUNTAS + 1) return null;
  const r = codigo.slice(1).split('').map(Number);
  const okContexto = CONTEXTO.every((p, i) => r[i] < p.opcoes.length);
  const okEixos = r.slice(CONTEXTO.length).every((v) => v <= 3);
  return okContexto && okEixos ? r : null;
}

// ---------------------------------------------------------------------------
// Gráfico de teia (SVG em texto: funciona no servidor e no navegador)
// ---------------------------------------------------------------------------
export function radarSvg(notas: number[], rotulos: string[], opcoes: { titulo?: string; comNotas?: boolean } = {}): string {
  const R = 150;
  const n = notas.length;
  const ponto = (i: number, valor: number) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const r = (valor / 100) * R;
    return [Math.cos(ang) * r, Math.sin(ang) * r] as const;
  };
  const poligono = (valores: number[]) => valores.map((v, i) => ponto(i, v).map((c) => c.toFixed(1)).join(',')).join(' ');
  const aneis = [25, 50, 75, 100].map((v) => `<polygon class="radar-anel" points="${poligono(Array(n).fill(v))}"/>`).join('');
  const eixos = notas.map((_, i) => { const [x, y] = ponto(i, 100); return `<line class="radar-eixo" x1="0" y1="0" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('');
  const pontos = notas.map((v, i) => { const [x, y] = ponto(i, Math.max(v, 3)); return `<circle class="radar-ponto" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5"/>`; }).join('');
  const rotulosSvg = rotulos.map((r, i) => {
    const [x, y] = ponto(i, 122);
    const ancora = Math.abs(x) < 8 ? 'middle' : x > 0 ? 'start' : 'end';
    const dy = y < -100 ? -4 : y > 100 ? 14 : 5;
    const nota = opcoes.comNotas ? `<tspan class="radar-nota" dx="6">${notas[i]}</tspan>` : '';
    return `<text class="radar-rotulo" x="${x.toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${ancora}">${r}${nota}</text>`;
  }).join('');
  const area = `<polygon class="radar-area" points="${poligono(notas.map((v) => Math.max(v, 3)))}"/>`;
  const titulo = opcoes.titulo ?? 'Gráfico de teia com a nota de cada área';
  return `<svg class="radar" viewBox="-265 -215 530 430" role="img" aria-label="${titulo}"><title>${titulo}</title>${aneis}${eixos}${area}${pontos}${rotulosSvg}</svg>`;
}
