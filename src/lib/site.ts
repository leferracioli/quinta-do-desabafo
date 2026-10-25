// Dados fixos do site
const WHATSAPP = '5518997357258';
const MENSAGEM_WHATSAPP = 'Tenho interesse na sua Mentoria/Consultoria';

export const SITE = {
  nome: 'Letícia Ferracioli',
  blog: 'Quinta do Desabafo',
  autora: 'Letícia Ferracioli',
  instagram: 'https://www.instagram.com/leferracioli/',
  linkedin: 'https://www.linkedin.com/in/leticiaferracioli/',
  telefone: '(18) 99735-7258',
  whatsapp: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM_WHATSAPP)}`,
  // Google Tag Manager (só carrega depois do aceite no banner de cookies)
  gtm: 'GTM-WN7GRKNK',
  // Google Analytics 4 (configurado dentro do GTM)
  ga4: 'G-M4ZNQFQ3S4',
};
