/**
 * Recebe os formulários do site leticiaferracioli.com.br e grava na planilha.
 *
 * Como instalar (passo a passo no README, seção "Planilha de leads e temas"):
 * 1. Crie uma planilha no Google Sheets.
 * 2. Menu Extensões → Apps Script. Apague o que estiver lá e cole este arquivo inteiro.
 * 3. Troque o valor de TOKEN pelo código secreto (o mesmo da variável PLANILHA_TOKEN na Vercel).
 * 4. Implantar → Nova implantação → tipo "App da Web"
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 5. Copie o URL do app da Web e coloque na variável PLANILHA_URL na Vercel.
 *
 * As abas "Leads", "Temas sugeridos" e "Diagnósticos" são criadas sozinhas no primeiro envio.
 */

const TOKEN = 'COLE-AQUI-O-CODIGO-SECRETO';

const ABAS = {
  lead: {
    nome: 'Leads',
    colunas: ['Data', 'Nome', 'WhatsApp', 'E-mail', 'Interesse', 'Mensagem', 'Página', 'Veio de (referrer)', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content'],
    linha: (d) => [d.nome, d.whatsapp, d.email, d.interesse, d.mensagem],
  },
  diagnostico: {
    nome: 'Diagnósticos',
    colunas: ['Data', 'Nome', 'WhatsApp', 'E-mail', 'Empresa', 'Papel', 'Tamanho do time', 'Vende para', 'Canal principal',
      'Maior problema (na visão da pessoa)', 'Nota geral', 'Nível', 'Gargalos prioritários',
      'Leads', 'Processo', 'Follow-up', 'CRM', 'Indicadores', 'Rotina', 'Pessoas', 'Automação', 'Link do relatório',
      'Página', 'Veio de (referrer)', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content'],
    linha: (d) => [d.nome, d.whatsapp, d.email, d.empresa, d.papel, d.time, d.modelo, d.canal, d.percepcao,
      Number(d.nota_geral), d.nivel, d.gargalos,
      Number(d.nota_leads), Number(d.nota_processo), Number(d.nota_velocidade), Number(d.nota_crm),
      Number(d.nota_indicadores), Number(d.nota_rotina), Number(d.nota_pessoas), Number(d.nota_automacao), d.link],
  },
  tema: {
    nome: 'Temas sugeridos',
    colunas: ['Data', 'Tema', 'Nome', 'E-mail', 'Página', 'Veio de (referrer)', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content'],
    linha: (d) => [d.tema, d.nome, d.email],
  },
};

function doPost(e) {
  const trava = LockService.getScriptLock();
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.token !== TOKEN) return responder({ ok: false, erro: 'token inválido' });

    const config = ABAS[d.tipo];
    if (!config) return responder({ ok: false, erro: 'tipo inválido' });

    trava.waitLock(10000);
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba = planilha.getSheetByName(config.nome) || planilha.insertSheet(config.nome);
    if (aba.getLastRow() === 0) {
      aba.appendRow(config.colunas);
      aba.setFrozenRows(1);
    }

    const origem = [d.pagina, d.referrer, d.utm_source, d.utm_medium, d.utm_campaign, d.utm_content];
    aba.appendRow([new Date()].concat(config.linha(d), origem).map(limpar));
    return responder({ ok: true });
  } catch (erro) {
    return responder({ ok: false, erro: String(erro) });
  } finally {
    try { trava.releaseLock(); } catch (_) {}
  }
}

// Impede que um texto enviado vire fórmula na planilha (ex.: começando com "=")
function limpar(valor) {
  if (valor === undefined || valor === null) return '';
  if (typeof valor === 'string' && /^[=+\-@]/.test(valor)) return "'" + valor;
  return valor;
}

function responder(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}
