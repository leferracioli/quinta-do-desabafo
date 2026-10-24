// Recebe os formulários do site (lead e sugestão de tema) e grava na planilha do Google.
// É a única parte do site que roda no servidor (função da Vercel); o resto é estático.
//
// Variáveis de ambiente (configuradas na Vercel):
//   PLANILHA_URL   → endereço do "app da Web" do Apps Script da planilha
//   PLANILHA_TOKEN → código secreto, igual ao TOKEN colado no Apps Script
import type { APIRoute } from 'astro';

export const prerender = false;

const campo = (f: FormData, nome: string, max: number) => String(f.get(nome) ?? '').trim().slice(0, max);

export const POST: APIRoute = async ({ request, redirect }) => {
  const f = await request.formData();
  const tipo = f.get('tipo') === 'tema' ? 'tema' : 'lead';
  const sucesso = tipo === 'tema' ? '/obrigado-tema/' : '/obrigado/';
  const falhou = () => redirect('/envio-falhou/', 303);

  // Armadilha para robôs: campo invisível que pessoas não preenchem
  if (campo(f, 'site', 200)) return redirect(sucesso, 303);
  if (f.get('consentimento') !== 'sim') return falhou();

  const origem = {
    pagina: campo(f, 'pagina', 300),
    referrer: campo(f, 'referrer', 300),
    utm_source: campo(f, 'utm_source', 120),
    utm_medium: campo(f, 'utm_medium', 120),
    utm_campaign: campo(f, 'utm_campaign', 120),
    utm_content: campo(f, 'utm_content', 120),
  };

  let dados: Record<string, string>;
  if (tipo === 'lead') {
    dados = {
      nome: campo(f, 'nome', 120),
      whatsapp: campo(f, 'whatsapp', 30),
      email: campo(f, 'email', 160),
      interesse: campo(f, 'interesse', 40),
      mensagem: campo(f, 'mensagem', 2000),
    };
    if (!dados.nome || dados.whatsapp.replace(/\D/g, '').length < 10) return falhou();
  } else {
    dados = {
      tema: campo(f, 'tema', 600),
      nome: campo(f, 'nome', 120),
      email: campo(f, 'email', 160),
    };
    if (dados.tema.length < 3) return falhou();
  }

  const url = process.env.PLANILHA_URL;
  const token = process.env.PLANILHA_TOKEN;
  if (!url || !token) {
    console.error('Formulário: PLANILHA_URL ou PLANILHA_TOKEN não configurados na Vercel');
    return falhou();
  }

  try {
    const resposta = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, tipo, ...dados, ...origem }),
    });
    const corpo = await resposta.json().catch(() => null);
    if (!resposta.ok || !corpo?.ok) throw new Error(`Planilha respondeu ${resposta.status}: ${JSON.stringify(corpo)}`);
  } catch (erro) {
    console.error('Formulário: falha ao gravar na planilha', erro);
    return falhou();
  }

  return redirect(sucesso, 303);
};
