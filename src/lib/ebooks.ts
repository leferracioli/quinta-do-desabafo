// Páginas de venda dos e-books (low-ticket). Uma página por ângulo, mesmo e-book.
// Para trocar preço ou link de checkout da Hotmart, edite `preco` / `checkout` abaixo.
// As páginas ficam em /ebook/<slug>/, fora do menu, do sitemap e do Google (noindex).
import capaNumeros from '../assets/ebooks/follow-up-em-numeros.jpg';
import capaPlaybook from '../assets/ebooks/playbook-do-retorno.jpg';
import capaSemResposta from '../assets/ebooks/quem-ficou-sem-resposta.jpg';

export interface Ebook {
  slug: string;
  capa: ImageMetadata;
  nome: string;
  /** Nome com a parte em destaque (cobre) separada */
  nomeAntes: string;
  nomeDestaque: string;
  subtitulo: string;
  gancho: string;
  preco: string;
  checkout: string;
  dorTitulo: string;
  dor: string[];
  pilaresTitulo: string;
  pilares: [string, string][];
  resultados: string[];
  /** Linha que filtra o público logo na primeira dobra (opcional) */
  filtro?: string;
}

export const EBOOKS: Ebook[] = [
  {
    slug: 'follow-up-em-numeros',
    capa: capaNumeros,
    nome: 'Follow-up em Números',
    nomeAntes: 'Follow-up em ',
    nomeDestaque: 'Números',
    subtitulo: 'Indicadores de vendas pra gestor saber quem retorna, quando e quanto isso vale.',
    gancho: 'Seu time diz que faz follow-up. Você consegue provar?',
    preco: '47',
    checkout: '#checkout',
    dorTitulo: 'Gestão no achismo custa venda todo mês',
    dor: [
      'Na reunião, todo mundo “chamou o cliente”. No fim do mês a meta não fecha, e ninguém sabe dizer onde a venda parou.',
      'O problema raramente é falta de lead. É conversa que parou esperando o time e nunca mais foi retomada. E isso não aparece em relatório nenhum.',
      'Sem número, sobra cobrar no grito. Com número, você sabe quem precisa de ajuda, em quê, e se a ajuda funcionou.',
    ],
    pilaresTitulo: 'Três números que mostram o follow-up do seu time',
    pilares: [
      ['Velocidade', 'Quantos % dos leads foram respondidos dentro da meta: 15 minutos no expediente.'],
      ['Cobertura', 'Das conversas que pararam esperando o time, quantas receberam follow-up. O número que o vendedor controla 100%.'],
      ['Conversão', 'Quantos % dos leads viraram venda. A consequência dos outros dois.'],
    ],
    resultados: [
      'Medir o antes e o depois em 30 minutos, com a planilha pronta',
      'Saber quem do time deixa conversa parada, sem ler o WhatsApp de todo mundo',
      'Cobrar processo, não grito, com um roteiro de feedback em 4 passos',
      'Entregar ao time a cadência e as 28 mensagens que fazem os números subirem',
    ],
  },
  {
    slug: 'playbook-do-retorno',
    capa: capaPlaybook,
    nome: 'Playbook do Retorno',
    nomeAntes: 'Playbook do ',
    nomeDestaque: 'Retorno',
    subtitulo: 'O playbook de follow-up de vendas pra padronizar o retorno da sua equipe.',
    gancho: 'Cada vendedor faz follow-up do seu jeito. Por isso o resultado também é de cada um.',
    preco: '47',
    checkout: '#checkout',
    dorTitulo: 'Quando o retorno depende da memória, a venda depende da sorte',
    dor: [
      'Um vendedor volta no dia seguinte, outro em uma semana, outro nunca. Um manda áudio de dois minutos, outro manda “e aí, conseguiu ver?”.',
      'Quando o melhor vendedor tira férias, as vendas paradas se acumulam. Quando entra alguém novo, leva meses para pegar o jeito.',
      'Padrão não engessa o time. Padrão tira o retorno da cabeça de cada um e coloca num processo que qualquer pessoa consegue seguir.',
    ],
    pilaresTitulo: 'Um padrão de follow-up que o time inteiro segue',
    pilares: [
      ['Cadência oficial', 'Seis toques em 30 dias, com canal e objetivo de cada um. Vira a régua da equipe.'],
      ['Biblioteca de mensagens', '28 mensagens organizadas por situação real, prontas para salvar como respostas rápidas.'],
      ['Rotina de retorno', 'Blocos diários de follow-up, revisão semanal de 15 minutos e repescagem no fim do mês.'],
    ],
    resultados: [
      'A cadência pronta para virar a régua oficial da equipe',
      '28 mensagens por situação para o time parar de improvisar',
      'Um plano de 7 dias para implantar sem parar a operação',
      'Um padrão para treinar quem chega, sem depender de quem já sabe',
    ],
  },
  {
    slug: 'quem-ficou-sem-resposta',
    capa: capaSemResposta,
    nome: 'Quem Ficou Sem Resposta?',
    nomeAntes: 'Quem Ficou ',
    nomeDestaque: 'Sem Resposta?',
    subtitulo: 'O cliente não responde, e o seu time não volta. Descubra quantas vendas estão paradas na sua equipe.',
    gancho: 'Quantas vendas estão paradas agora no WhatsApp do seu time?',
    preco: '47',
    checkout: '#checkout',
    dorTitulo: 'A venda não se perde no “não”. Se perde no silêncio.',
    dor: [
      'O cliente pediu informação, pareceu interessado, disse que ia pensar... e sumiu. E o vendedor, com medo de parecer chato, sumiu junto.',
      'Multiplique isso pelo seu time: dezenas de conversas paradas esperando alguém voltar. Nenhuma aparece no relatório como venda perdida. Mas é.',
      '“Depois eu chamo” é a frase mais cara da sua operação.',
    ],
    pilaresTitulo: 'Descobrir, recuperar e não deixar acumular de novo',
    pilares: [
      ['Diagnóstico', 'As 4 causas do silêncio e qual mensagem cada uma pede. Chega de “e aí, conseguiu ver?”.'],
      ['Recuperação', '28 mensagens por situação, incluindo reativação de leads com mais de 30 dias.'],
      ['Prevenção', 'Cadência e rotina para nenhuma conversa ficar parada esperando o time.'],
    ],
    resultados: [
      'Levantar quantas conversas estão paradas esperando o seu time',
      'Saber por que cada lead sumiu e o que mandar em cada caso',
      'Reativar leads antigos sem soar desesperado',
      'Uma rotina para isso não voltar a acontecer',
    ],
    filtro: 'Feito para quem lidera vendedores. Se você vende sozinho, também serve, mas o foco é colocar um time inteiro no mesmo ritmo.',
  },
];

export const DADOS: [string, string, string][] = [
  ['7x', 'mais chance, quase, de falar com quem decide quando o contato acontece na primeira hora', 'Harvard Business Review, 2011'],
  ['42h', 'é o tempo médio que as empresas levam para responder um lead (entre as que respondem em até 30 dias)', 'Harvard Business Review, 2011'],
  ['100x', 'mais chance de contato ligando em 5 minutos em vez de 30', 'MIT / InsideSales'],
  ['+65,8%', 'de respostas com um único follow-up a mais', 'Backlinko e Pitchbox, 12 milhões de e-mails'],
];

export const CAPITULOS: [string, string, string][] = [
  ['1', 'Por que o lead some', 'As 4 causas do silêncio e o que os dados dizem sobre velocidade'],
  ['2', 'As 4 regras do follow-up que não irrita', 'O filtro que toda mensagem precisa passar'],
  ['3', 'A cadência', 'Seis toques do primeiro contato ao dia 30, e o que fazer depois'],
  ['4', 'Scripts por situação', '28 mensagens prontas: vou pensar, tá caro, vou ver com o sócio, visualizou e não respondeu'],
  ['5', 'Áudio, texto ou ligação?', 'Quando usar cada canal e quando trocar'],
  ['6', 'Os 8 erros que matam a venda', 'O que o time faz no automático e custa caro'],
  ['7', 'Antes e depois', 'Como medir o que mudou'],
  ['8', 'Guia do gestor', 'O método no time em 7 dias, a rotina que sustenta e como cobrar sem microgerenciar'],
];

export const FAQ: [string, string][] = [
  ['Serve para o meu segmento?', 'Serve para qualquer time que vende por conversa: WhatsApp, Direct, e-mail ou telefone. As mensagens têm colchetes para adaptar ao seu produto, e a cadência tem orientação para ciclos curtos e longos.'],
  ['Meu time é pequeno, com 2 ou 3 pessoas. Vale?', 'Vale. Com time pequeno, cada conversa parada pesa mais no resultado. O plano de 7 dias funciona igual, só leva menos tempo.'],
  ['Preciso de CRM?', 'Não. O método funciona com etiquetas do WhatsApp Business, planilha ou CRM. O que importa é registrar em que dia da cadência cada lead está.'],
  ['Como recebo o material?', 'Logo depois da confirmação do pagamento, pela área de membros da Hotmart: e-book em PDF, planilha de medição e o painel do time.'],
  ['E se não servir para mim?', 'Você tem 7 dias de garantia. Se não fizer sentido, pede o reembolso pela própria Hotmart, sem precisar explicar o motivo.'],
];

// `contexto` (opcional): uma linha sobre o que foi feito lá. Com contexto, o item vira cartão.
export const EMPRESAS: { nome: string; contexto?: string }[] = [
  { nome: 'FAMESP | Faculdade Método de São Paulo', contexto: 'Supervisão comercial e gestão do time de vendas' },
  { nome: 'Camila Brunetta', contexto: 'Reestruturação comercial e treinamento de closers e SDRs · R$ 500 mil em vendas' },
  { nome: 'Luisa Nunes', contexto: 'Supervisão comercial · R$ 500 mil em vendas · time responsável por 75% das vendas dos lançamentos' },
  { nome: 'Gabriela Braitt', contexto: 'Reestruturação comercial, contratação e treinamento de closers, SDRs e social selling · R$ 150 mil em vendas' },
  { nome: 'Flávio Lettieri', contexto: 'Gestão de tráfego pago: o lado que gera o lead, antes de ele chegar ao comercial' },
  { nome: 'Pratinho Colorido | Introdução Alimentar BLW', contexto: 'Coprodução, estratégia e tráfego pago de lançamentos · R$ 40 mil em vendas vindas do tráfego' },
  { nome: 'Leonardo Ames' },
  { nome: 'Dr. Irineu Neto' },
  { nome: 'DRONENG | Aerofotogrametria com Drones' },
];
