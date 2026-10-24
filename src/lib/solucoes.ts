// Textos das soluções (home e /solucoes). Edite à vontade: é só texto.
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
    paraQuem: 'Para quem lidera, ou vai liderar, um time de vendas.',
    resumo:
      'Um espaço para pensar junto as decisões do dia a dia da liderança comercial: como acompanhar o time, quais indicadores olhar, como dar feedback e como organizar a rotina para não viver só apagando incêndio.',
    temas: ['Rotina de gestão do time', 'Indicadores e metas', 'Feedback e desenvolvimento', 'Uso de CRM e automações no dia a dia'],
  },
  {
    id: 'consultoria',
    nome: 'Consultoria comercial',
    destaque: 'Consultoria',
    paraQuem: 'Para empresas que querem olhar a operação comercial de ponta a ponta.',
    resumo:
      'Um olhar de fora para a operação: do primeiro contato com o lead até o pós-venda. A ideia é entender como as coisas se conectam, encontrar onde estão os gargalos e organizar um jeito de trabalhar que o time consiga sustentar.',
    temas: ['Processo e funil de vendas', 'Indicadores e acompanhamento', 'CRM e automações', 'Integração entre marketing e vendas'],
  },
];
