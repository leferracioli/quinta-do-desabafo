// Inscrição na newsletter via Brevo, com confirmação dupla (double opt-in).
// A pessoa recebe um e-mail com link de confirmação; só depois do clique ela entra na lista.
//
// Variáveis de ambiente (configuradas na Vercel):
//   BREVO_API_KEY          → chave de API do Brevo (Configurações → SMTP e API → Chaves de API)
//   BREVO_LISTA_ID         → número da lista "Quinta do Desabafo" no Brevo
//   BREVO_TEMPLATE_DOI_ID  → número do modelo de e-mail de confirmação (tipo "double opt-in")

const API = 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation';

export async function inscreverNewsletter(email: string, nome: string, site: URL): Promise<boolean> {
  const chave = process.env.BREVO_API_KEY;
  const lista = Number(process.env.BREVO_LISTA_ID);
  const modelo = Number(process.env.BREVO_TEMPLATE_DOI_ID);
  if (!chave || !lista || !modelo) {
    console.error('Newsletter: BREVO_API_KEY, BREVO_LISTA_ID ou BREVO_TEMPLATE_DOI_ID não configurados na Vercel');
    return false;
  }

  const resposta = await fetch(API, {
    method: 'POST',
    headers: { 'api-key': chave, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      email,
      ...(nome && { attributes: { FIRSTNAME: nome } }),
      includeListIds: [lista],
      templateId: modelo,
      // Para onde a pessoa vai depois de clicar no link de confirmação
      redirectionUrl: new URL('/newsletter/confirmada/', site).href,
    }),
  });

  // 201 = e-mail de confirmação enviado; 204 = contato já existia e foi atualizado
  if (resposta.status === 201 || resposta.status === 204) return true;
  console.error('Newsletter: Brevo respondeu', resposta.status, await resposta.text().catch(() => ''));
  return false;
}
