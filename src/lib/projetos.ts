// Projetos (estudos de caso) da página /projetos/ e da home.
// Regras: tudo anonimizado. Nada de nome de empresa, volume absoluto, faturamento
// ou dado financeiro. Proporções só entram depois de aprovadas pela Letícia.
// O status precisa refletir a realidade: Em uso, Implementado, Desenvolvido, Estudo, No ar.

export type Status = 'Em uso' | 'Implementado' | 'Desenvolvido' | 'Estudo' | 'No ar';
export type Ilustracao = 'barras' | 'farol' | 'sessoes' | 'funil' | 'teia';

export interface Projeto {
  slug: string;
  titulo: string;
  status: Status;
  contexto: string; // setor, anonimizado
  ilustracao: Ilustracao;
  legenda: string; // legenda da ilustração
  resumo: string; // usado na home e na lista
  description: string; // meta description
  secoes: { titulo: string; paragrafos: string[] }[];
  feitoCom?: string;
  cta?: { texto: string; href: string };
  destaqueHome?: boolean;
}

export const PROJETOS: Projeto[] = [
  {
    slug: 'painel-de-desempenho-por-vendedor',
    titulo: 'O painel em que cada vendedor se enxerga',
    status: 'Em uso',
    contexto: 'Instituição de ensino',
    ilustracao: 'barras',
    legenda: 'Ilustração · desempenho por pessoa contra a meta',
    resumo:
      'Atendimento num sistema, matrícula em outro, meta numa planilha: cada um tinha a sua versão do número. Construí um painel ligado ao CRM e ao sistema de matrículas, com endereço próprio para cada consultor. A conversa saiu de “de quem é o número certo” para “o que fazer com ele”.',
    description:
      'Como um painel ligado ao CRM e ao sistema de matrículas deu a cada consultor a visão do próprio desempenho, todos os dias.',
    secoes: [
      {
        titulo: 'Contexto',
        paragrafos: [
          'Uma instituição de ensino com time de consultores atendendo leads pelo WhatsApp. O resultado do mês só aparecia no fim do mês, e quase sempre era questionado.',
        ],
      },
      {
        titulo: 'O problema',
        paragrafos: [
          'Atendimento num sistema, matrícula em outro, meta numa planilha. Cada um tinha a sua versão do número, e a conversa de gestão virava discussão sobre quem estava certo.',
        ],
      },
      {
        titulo: 'O que eu construí',
        paragrafos: [
          'Um painel ligado direto ao CRM e ao sistema de matrículas, com atualização automática ao longo do dia. Cada consultor tem um endereço próprio e vê o próprio desempenho: atendimentos, matrículas confirmadas, conversão, distância da meta e quem matriculou.',
          'O tempo de primeira resposta é medido de um jeito justo: o tempo em que o lead ainda estava na triagem não entra na conta de quem atende.',
        ],
      },
      {
        titulo: 'O que mudou na leitura',
        paragrafos: [
          'A matrícula passou a vir da fonte oficial, não do que estava marcado no CRM. Parece um detalhe, mas é a diferença entre discutir o número e discutir o que fazer com ele.',
        ],
      },
    ],
    feitoCom: 'CRM via webhook e API · banco de dados · painel web',
    destaqueHome: true,
  },
  {
    slug: 'lead-quente-que-nao-previa',
    titulo: 'O lead “quente” que não previa quase nada',
    status: 'Estudo',
    contexto: 'Instituição de ensino',
    ilustracao: 'farol',
    legenda: 'Ilustração · o sinal chega antes ou depois da compra?',
    resumo:
      'Antes de levar o termômetro de leads para uma tela nova, uma pergunta simples: ele avisa antes da compra ou só confirma depois? A resposta mudou a tela. E revelou um recorte pequeno que valia muito mais que o termômetro inteiro.',
    description:
      'Um estudo que testou se a temperatura do lead previa a compra ou só a confirmava, e por que o número ficou fora da tela.',
    secoes: [
      {
        titulo: 'Contexto',
        paragrafos: [
          'A operação tinha um termômetro: cada lead recebia uma temperatura, e “quente” significava “prioridade”. A ideia era levar essa temperatura para uma nova tela de inteligência de demanda.',
        ],
      },
      {
        titulo: 'A pergunta',
        paragrafos: [
          'Antes de colocar o termômetro na tela, testei uma coisa simples: o lead vira “quente” antes de comprar ou só quando já está comprando?',
        ],
      },
      {
        titulo: 'O que os dados mostraram',
        paragrafos: [
          'Cruzando a data em que cada lead virou “quente” com a data da matrícula, a minoria das matrículas tinha sido sinalizada antes. Boa parte virou “quente” no mesmo dia, ou depois, e muitas nunca viraram. O termômetro funcionava mais como espelho do que como farol.',
          'A hipótese seguinte era que faltava volume. Refiz a análise meses depois, com muito mais dados, e a hipótese não se confirmou.',
        ],
      },
      {
        titulo: 'A decisão',
        paragrafos: [
          'A temperatura ficou fora da tela de demanda. Em compensação, o mesmo estudo mostrou que um recorte pequeno dos leads, o mais quente de todos, concentrava uma parte grande das matrículas. Esse recorte virou critério de prioridade de atendimento.',
        ],
      },
      {
        titulo: 'Por que esse caso importa',
        paragrafos: ['Teria sido mais fácil colocar o número na tela. Ele parecia inteligente. Só não ajudava a decidir.'],
      },
    ],
    feitoCom: 'Eventos do CRM · cruzamento de datas · análise de coorte',
    destaqueHome: true,
  },
  {
    slug: 'ia-que-le-o-atendimento-inteiro',
    titulo: 'Uma IA que lê o atendimento inteiro, não pedaços',
    status: 'Implementado',
    contexto: 'Instituição de ensino',
    ilustracao: 'sessoes',
    legenda: 'Ilustração · sessões partidas reunidas numa conversa',
    resumo:
      'O CRM partia a conversa em várias sessões, e avaliar uma delas era avaliar só um pedaço da história. A análise junta tudo o que o lead viveu, separa lead, atendente e robô e devolve 8 critérios, pontos fortes e uma ação recomendada para quem atendeu.',
    description:
      'Como uma análise com IA passou a avaliar a conversa inteira de cada lead, em 8 critérios, em vez de pedaços soltos do atendimento.',
    secoes: [
      {
        titulo: 'Contexto',
        paragrafos: [
          'Avaliar a qualidade do atendimento dependia de alguém ler conversas por amostragem, quando sobrava tempo. Ou seja, quase nunca.',
        ],
      },
      {
        titulo: 'O problema escondido',
        paragrafos: [
          'O CRM divide a conversa em sessões: o lead some, volta dois dias depois, e o sistema conta como outro atendimento. Muitos leads tinham a conversa partida em vários pedaços. Avaliar uma sessão era avaliar uma parte da história.',
        ],
      },
      {
        titulo: 'O que eu construí',
        paragrafos: [
          'Uma análise que junta todas as sessões do mesmo lead em ordem, separa o que foi dito pelo lead, pelo atendente e pelo robô, espera a conversa esfriar por um dia e só então avalia.',
          'São 8 critérios definidos com a gestão, com pontos fortes, pontos a melhorar e uma ação recomendada para quem atendeu. Roda sozinha, todos os dias.',
        ],
      },
    ],
    feitoCom: 'API do CRM · modelo de linguagem com critérios da gestão · rotinas automáticas',
    destaqueHome: true,
  },
  {
    slug: 'radar-para-crm-sem-relatorio',
    titulo: 'Um radar para um CRM que não tinha relatório',
    status: 'Desenvolvido',
    contexto: 'Empresa de mentorias',
    ilustracao: 'funil',
    legenda: 'Ilustração · funil, negócios parados e fila de recuperação',
    resumo:
      'Um CRM próprio, com funil e etapas, mas sem relatório que respondesse ao básico. Construí um radar que guarda o histórico que o sistema apagava e entrega funil, ciclo, negócios parados e uma fila de recuperação com a mensagem pronta.',
    description:
      'Um radar comercial para um CRM sem relatórios: funil, ciclo de vendas, negócios parados e fila de recuperação de leads.',
    secoes: [
      {
        titulo: 'Contexto',
        paragrafos: [
          'Uma empresa de mentorias usava um CRM próprio, com funil e etapas, mas sem relatório que respondesse ao básico: quanto converte, onde trava, quem está parado.',
        ],
      },
      {
        titulo: 'O que eu descobri no caminho',
        paragrafos: [
          'O sistema não marcava venda nem perda no campo de status: o resultado estava escondido no nome da etapa. E a API apagava o histórico: só dava para ver o presente.',
        ],
      },
      {
        titulo: 'O que eu construí',
        paragrafos: [
          'Um radar que lê o CRM duas vezes por dia, guarda o histórico que o sistema perde e registra cada mudança de etapa em tempo real.',
          'Ele entrega funil, conversão, tempo de ciclo, negócios parados e uma fila de recuperação de leads com a mensagem pronta para cada situação.',
        ],
      },
    ],
    feitoCom: 'API e webhook do CRM · banco de dados local · rotinas agendadas · painel em HTML',
  },
  {
    slug: 'diagnostico-comercial',
    titulo: 'Um diagnóstico comercial em 4 minutos',
    status: 'No ar',
    contexto: 'Este site',
    ilustracao: 'teia',
    legenda: 'Ilustração · as 8 áreas da operação num gráfico de teia',
    resumo:
      'Muita gente sente que o comercial poderia render mais, mas não sabe dizer onde está o problema. O diagnóstico deste site transforma 21 perguntas num gráfico das 8 áreas da operação, com os gargalos prioritários.',
    description: 'O diagnóstico comercial gratuito deste site: 21 perguntas, 8 áreas da operação, gráfico de teia e gargalos prioritários.',
    secoes: [
      {
        titulo: 'Contexto',
        paragrafos: ['Muita gente sente que o comercial poderia render mais, mas não sabe dizer onde está o problema.'],
      },
      {
        titulo: 'O que eu construí',
        paragrafos: [
          'O diagnóstico deste site: 21 perguntas sobre 8 áreas da operação, uma nota por área, um gráfico de teia e os gargalos prioritários, cada um com um primeiro passo.',
        ],
      },
    ],
    cta: { texto: 'Fazer o diagnóstico', href: '/diagnostico/' },
  },
];

/** Regras de leitura de dados, na abertura de /projetos/ */
export const PRINCIPIOS = [
  {
    titulo: 'Perdido é quem disse não.',
    texto: 'Lead parado não é lead perdido: é lead sem desfecho, e merece atenção própria. Marcar como perda o que é só silêncio deixa a conversão bonita e a gestão cega.',
  },
  {
    titulo: 'Um indicador precisa prever, não só descrever.',
    texto: 'Antes de colocar um número na tela, eu testo se ele avisa antes ou só confirma depois.',
  },
  {
    titulo: 'O dado oficial vence o dado conveniente.',
    texto: 'Se a venda é confirmada em outro sistema, é de lá que ela vem. Quando a fonte é provisória, o número também é.',
  },
  {
    titulo: 'Discordar é parte do método.',
    texto: 'Se o dado contraria a hipótese, inclusive a minha, quem muda é a hipótese.',
  },
];
