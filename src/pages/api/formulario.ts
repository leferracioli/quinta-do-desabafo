// Recebe os formulários do site (lead, sugestão de tema e diagnóstico comercial) e grava na planilha do Google.
// A inscrição na newsletter (tipo "newsletter") vai direto para o Brevo (ver src/lib/newsletter.ts).
// É a única parte do site que roda no servidor (função da Vercel); o resto é estático.
//
// Variáveis de ambiente (configuradas na Vercel):
//   PLANILHA_URL   → endereço do "app da Web" do Apps Script da planilha
//   PLANILHA_TOKEN → código secreto, igual ao TOKEN colado no Apps Script
import type { APIRoute } from 'astro';
import { inscreverNewsletter } from '../../lib/newsletter';

export const prerender = false;

const campo = (f: FormData, nome: string, max: number) => String(f.get(nome) ?? '').trim().slice(0, max);

export const POST: APIRoute = async ({ request, redirect, site }) => {
  const f = await request.formData();
  const tipoRecebido = f.get('tipo');
  const tipo = tipoRecebido === 'tema' ? 'tema' : tipoRecebido === 'diagnostico' ? 'diagnostico' : 'lead';
  const sucesso = tipo === 'tema' ? '/obrigado-tema/' : '/obrigado/';

  // O diagnóstico envia por JavaScript e espera JSON; os outros formulários esperam redirecionamento
  const querJson = (request.headers.get('accept') ?? '').includes('application/json');
  const ok = () => (querJson ? Response.json({ ok: true }) : redirect(sucesso, 303));
  const falhou = () => (querJson ? Response.json({ ok: false }, { status: 400 }) : redirect('/envio-falhou/', 303));

  // Armadilha para robôs: campo invisível que pessoas não preenchem
  if (campo(f, 'site', 200)) return ok();
  if (f.get('consentimento') !== 'sim') return falhou();

  // Newsletter: cadastra no Brevo (confirmação dupla) e manda para a página "confirme no seu e-mail"
  if (tipoRecebido === 'newsletter') {
    const email = campo(f, 'email', 160);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect('/envio-falhou/', 303);
    const inscrito = await inscreverNewsletter(email, campo(f, 'nome', 120), site!).catch((erro) => {
      console.error('Newsletter: falha ao chamar o Brevo', erro);
      return false;
    });
    return redirect(inscrito ? '/newsletter/confirme/' : '/envio-falhou/', 303);
  }

  const origem = {
    pagina: campo(f, 'pagina', 300),
    referrer: campo(f, 'referrer', 300),
    utm_source: campo(f, 'utm_source', 120),
    utm_medium: campo(f, 'utm_medium', 120),
    utm_campaign: campo(f, 'utm_campaign', 120),
    utm_content: campo(f, 'utm_content', 120),
  };

  let dados: Record<string, string>;
  if (tipo === 'diagnostico') {
    dados = {
      nome: campo(f, 'nome', 120),
      whatsapp: campo(f, 'whatsapp', 30),
      email: campo(f, 'email', 160),
      empresa: campo(f, 'empresa', 120),
      papel: campo(f, 'papel', 60),
      time: campo(f, 'time', 30),
      modelo: campo(f, 'modelo', 40),
      canal: campo(f, 'canal', 40),
      percepcao: campo(f, 'percepcao', 120),
      nota_geral: campo(f, 'nota_geral', 3),
      nivel: campo(f, 'nivel', 40),
      gargalos: campo(f, 'gargalos', 200),
      link: campo(f, 'link', 200),
      codigo: campo(f, 'codigo', 40),
    };
    for (const eixo of ['leads', 'processo', 'velocidade', 'crm', 'indicadores', 'rotina', 'pessoas', 'automacao']) {
      dados[`nota_${eixo}`] = campo(f, `nota_${eixo}`, 3);
    }
    if (!dados.nome || dados.whatsapp.replace(/\D/g, '').length < 10) return falhou();
  } else if (tipo === 'lead') {
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

  return ok();
};
