Você vai me ajudar a terminar a configuração da newsletter "Quinta do Desabafo" no Brevo, que já está aberto e logado nesta aba. O domínio leticiaferracioli.com.br já está autenticado e a lista "Quinta do Desabafo" já existe.

REGRAS
- Não contrate plano, não faça upgrade e não informe dados de pagamento. Se algo exigir plano pago, pare e me avise.
- Não gere nem copie chave de API: essa parte eu faço sozinha.
- Não ative nenhum envio para a lista sem me mostrar antes e eu aprovar. Envios de teste só para leferracioli@gmail.com.
- Se algum menu tiver nome diferente do que está aqui (o Brevo muda a interface), procure o equivalente e me diga onde achou.
- No fim, me passe um resumo com os números (IDs) pedidos.

TAREFA 1 · Remetente
Em Configurações → Remetentes, domínios e IPs → Remetentes, confira se existe este remetente. Se não existir, crie:
- Nome: Letícia Ferracioli · Quinta do Desabafo
- E-mail: newsletter@leticiaferracioli.com.br

TAREFA 2 · ID da lista
Em Contatos → Listas, ache a lista "Quinta do Desabafo" e me diga o número (ID) dela.

TAREFA 3 · Modelo de confirmação (double opt-in)
1. Vá em Campanhas → Modelos (ou "Templates") → Criar modelo.
2. Nome do modelo: Confirmação newsletter (DOI)
3. Assunto: Confirme sua inscrição na Quinta do Desabafo
4. Remetente: o da Tarefa 1. Responder para: leferracioli@gmail.com
5. Escolha o editor de código ("Colar seu código" / "Code your own") e cole exatamente o HTML abaixo.
6. Ative a opção que marca o modelo como "double opt-in" (DOI). O link do botão já usa a tag {{ doubleoptin }}, que o Brevo exige.
7. Salve, ative o modelo e me diga o número (ID) dele.

HTML DO MODELO DE CONFIRMAÇÃO (colar inteiro):
<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Confirme sua inscrição</title></head>
<body style="margin:0;padding:0;background:#efeae3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efeae3;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#2a2a2c;">
        <tr><td style="height:4px;background:#e0662f;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:40px 40px 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#a89f94;">Quinta do Desabafo · Newsletter</td></tr>
        <tr><td style="padding:8px 40px 0;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.15;color:#efeae3;">Falta só <em style="color:#ea7440;">um clique</em>.</td></tr>
        <tr><td style="padding:20px 40px 0;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.6;color:#efeae3;">
          Oi! Recebi o seu pedido para assinar a newsletter da Quinta do Desabafo. Para confirmar que foi você mesmo, é só clicar no botão abaixo.
        </td></tr>
        <tr><td style="padding:28px 40px 8px;">
          <a href="{{ doubleoptin }}" style="display:inline-block;background:#efeae3;color:#2a2a2c;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:16px 28px;border-bottom:3px solid #e0662f;">Confirmar inscrição</a>
        </td></tr>
        <tr><td style="padding:20px 40px 40px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#a89f94;">
          Toda quinta, quando sair um desabafo novo, ele chega aqui. Se você não pediu essa inscrição, é só ignorar este e-mail: sem o clique, nada acontece.<br><br>
          Letícia Ferracioli · <a href="https://www.leticiaferracioli.com.br/" style="color:#a89f94;">leticiaferracioli.com.br</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>

TAREFA 4 · Envio automático do artigo novo (campanha RSS)
1. Procure a campanha por RSS: pode estar em Campanhas → Criar campanha → RSS, ou em Integrações → RSS. Se o plano gratuito não permitir, pare e me avise (não faça upgrade).
2. Configure:
   - Nome: Quinta do Desabafo · artigo novo
   - Feed RSS: https://www.leticiaferracioli.com.br/rss.xml
   - Lista: Quinta do Desabafo
   - Frequência: semanal, toda quinta-feira às 12:00 (horário de Brasília). Deve enviar só quando houver artigo novo no feed.
   - Remetente: o da Tarefa 1. Responder para: leferracioli@gmail.com
   - Assunto: use o título do artigo novo, se o Brevo permitir (tag do título do item do RSS). Se não permitir: "Saiu a Quinta do Desabafo desta semana"
3. Monte o e-mail no editor de arrastar e soltar, nesta ordem:
   a) Topo com fundo #2a2a2c: texto "Quinta do Desabafo" (fonte Georgia, 24px, cor #efeae3) e, abaixo, "por Letícia Ferracioli · toda quinta" (Arial 12px, maiúsculas, cor #a89f94). Uma linha fina laranja #e0662f acima do topo.
   b) Bloco de RSS mostrando só o item mais recente: título do artigo (Georgia 30px, cor #2a2a2c), resumo (Arial 17px, cor #2a2a2c) e botão "Ler o desabafo" (fundo #2a2a2c, texto #efeae3, ligado ao link do item).
   c) Texto: "Responda este e-mail se quiser comentar ou sugerir o próximo tema. Eu leio todos." e "Letícia · @leferracioli" (com link para https://www.instagram.com/leferracioli/).
   d) Rodapé padrão do Brevo com o link de descadastro, e o texto: "Você recebe este e-mail porque assinou a newsletter em leticiaferracioli.com.br."
   Fundo geral do e-mail: #efeae3. Conteúdo central: branco.
4. Envie um e-mail de TESTE para leferracioli@gmail.com e me mostre como ficou. NÃO ative a campanha: eu reviso e aprovo antes.

RESUMO FINAL que eu preciso:
- ID da lista: ...
- ID do modelo de confirmação (DOI): ...
- Campanha RSS: criada? teste enviado? alguma limitação do plano gratuito?
- Qualquer coisa que você não conseguiu fazer e por quê.
