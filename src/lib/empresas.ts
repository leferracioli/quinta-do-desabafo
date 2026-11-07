// Empresas em que a Letícia já trabalhou, mostradas na página Sobre como perfis do Instagram.
// Os dados são uma foto do momento (coletados em 07/11/2026): não atualizam sozinhos.
// De propósito, não há links: a ideia é não mandar tráfego para esses perfis.
import type { ImageMetadata } from 'astro';
import lettieriflavio from '../assets/empresas/lettieriflavio.jpg';
import dronengbr from '../assets/empresas/dronengbr.jpg';
import pratinhoColorido from '../assets/empresas/pratinho_colorido.jpg';
import luisaNunes from '../assets/empresas/instadaluisanunes.jpg';
import famesp from '../assets/empresas/famespoficial.jpg';
import camilaBrunetta from '../assets/empresas/camilabrunetta.jpg';
import irineuNeto from '../assets/empresas/dririneuneto.jpg';
import leonardoAmes from '../assets/empresas/leonardo_ames.jpg';
import gabiBraitt from '../assets/empresas/gabibraitt.jpg';

export type Empresa = {
  usuario: string;
  nome: string;
  foto: ImageMetadata;
  posts: string;
  seguidores: string;
  seguindo: string;
  bio: string[]; // cada item vira uma linha, como na bio do Instagram
};

export const EMPRESAS: Empresa[] = [
  {
    usuario: 'lettieriflavio',
    nome: 'Flávio Lettieri | Liderança',
    foto: lettieriflavio,
    posts: '2.006',
    seguidores: '26,8 mil',
    seguindo: '241',
    bio: ['🏆 Desenvolvo Líderes e Equipes de Alta Performance', '🤝 + de 54 mil líderes transformados'],
  },
  {
    usuario: 'dronengbr',
    nome: 'Aerofotogrametria com Drones',
    foto: dronengbr,
    posts: '1.551',
    seguidores: '72,2 mil',
    seguindo: '247',
    bio: ['🏆 Única pós-graduação em Aerofotogrametria com Drones do Brasil!'],
  },
  {
    usuario: 'pratinho_colorido',
    nome: 'Barbara | BLW Mom & UGC Creator',
    foto: pratinhoColorido,
    posts: '2.575',
    seguidores: '84,4 mil',
    seguindo: '300',
    bio: ['Mom life | Food & family routines', 'UGC creator helping brands connect through real life moments.'],
  },
  {
    usuario: 'instadaluisanunes',
    nome: 'Luisa Nunes | Vida Organizada',
    foto: luisaNunes,
    posts: '3.988',
    seguidores: '254 mil',
    seguindo: '62',
    bio: ['Aqui falamos sobre tudo: casamento, criação de filhos, independência e autoestima.'],
  },
  {
    usuario: 'famespoficial',
    nome: 'FAMESP',
    foto: famesp,
    posts: '2.664',
    seguidores: '45 mil',
    seguindo: '452',
    bio: ['🏅 Nota MÁXIMA no MEC', '🎓 Há 35 anos realizando sonhos'],
  },
  {
    usuario: 'camilabrunetta.psi',
    nome: 'Camila Brunetta | Mentora de carreira',
    foto: camilaBrunetta,
    posts: '1.406',
    seguidores: '148 mil',
    seguindo: '2.125',
    bio: ['Aqui profissionais da saúde deixam de competir por preço e se tornam referência'],
  },
  {
    usuario: 'dr.irineunetourologista',
    nome: 'Dr. Irineu Neto | Fertilidade Masculina',
    foto: irineuNeto,
    posts: '448',
    seguidores: '56 mil',
    seguindo: '385',
    bio: ['Referência em casos complexos de infertilidade | UNIFESP'],
  },
  {
    usuario: 'leonardo_ames',
    nome: 'Leonardo Ames',
    foto: leonardoAmes,
    posts: '365',
    seguidores: '31,1 mil',
    seguindo: '1.589',
    bio: ['23 anos, empresário e mentor.', '📦 +R$100MM por ano com e-commerce'],
  },
  {
    usuario: 'gabibraitt',
    nome: 'Gabriela Braitt | Estrategista de Carreira e Negócios',
    foto: gabiBraitt,
    posts: '1.686',
    seguidores: '119 mil',
    seguindo: '210',
    bio: ['🔥 Transformo sua insegurança em clareza, confiança, decisão e postura executiva.'],
  },
];
