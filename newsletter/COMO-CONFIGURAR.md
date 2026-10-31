# Newsletter da Quinta do Desabafo: como configurar o Brevo

O site já está pronto para a newsletter: formulário no fim de cada artigo, na página da Quinta do Desabafo e em `/newsletter/`. Falta ligar o Brevo, o serviço que guarda a lista e manda os e-mails. Uma vez configurado, tudo roda sozinho: quem se inscreve confirma pelo e-mail, e toda quinta o Brevo lê o RSS do blog e manda o artigo novo.

Os passos marcados com **(você)** precisam ser feitos logada na sua conta. Os outros eu faço.

## 1. Criar a conta (você)
1. Entre em [brevo.com](https://www.brevo.com) e crie a conta no plano **Free** (300 e-mails por dia, sem custo).
2. Confirme o e-mail da conta.

## 2. Autenticar o domínio (você + eu)
Isso evita que a newsletter caia no spam.
1. **(você)** No Brevo: **Configurações → Remetentes, domínios e IPs → Domínios → Adicionar domínio** → `leticiaferracioli.com.br`.
2. O Brevo mostra alguns registros DNS (código Brevo, DKIM e DMARC). **Me mande um print dessa tela**: eu adiciono os registros no DNS da Vercel (onde o domínio está) e você clica em **Autenticar**.
3. **(você)** Em **Remetentes**, crie o remetente:
   - Nome: `Letícia Ferracioli · Quinta do Desabafo`
   - E-mail: `newsletter@leticiaferracioli.com.br`

   As respostas dos leitores podem ir para o seu Gmail: na campanha, preencha o campo **Responder para**.

## 3. Criar a lista (você)
**Contatos → Listas → Criar lista** → nome `Quinta do Desabafo`. Anote o **número (ID)** da lista.

## 4. Criar o e-mail de confirmação (você + eu)
1. **Campanhas → Modelos → Novo modelo**.
2. Assunto: `Confirme sua inscrição na Quinta do Desabafo`.
3. Escolha **Colar seu código** e cole o arquivo [`modelo-confirmacao.html`](modelo-confirmacao.html).
4. Ative a opção **Modelo de double opt-in (DOI)**.
5. Salve e anote o **número (ID)** do modelo.

## 5. Ligar o site ao Brevo (você)
1. No Brevo: **Configurações → SMTP e API → Chaves de API → Gerar nova chave**.
2. Na Vercel: projeto `quinta-do-desabafo` → **Settings → Environment Variables**. Crie as três variáveis, marcando **Production** e **Preview**:
   - `BREVO_API_KEY` = a chave que você gerou. **Ela é secreta: não mande para ninguém, nem para mim.**
   - `BREVO_LISTA_ID` = o número da lista (passo 3)
   - `BREVO_TEMPLATE_DOI_ID` = o número do modelo (passo 4)
3. Me avise: eu publico o site de novo para as variáveis valerem e faço uma inscrição de teste.

## 6. Envio automático toda quinta (você + eu)
1. **Campanhas → RSS** (ou **Integrações → RSS**). Os nomes mudam um pouco conforme a versão do Brevo.
2. Configure:
   - Feed: `https://www.leticiaferracioli.com.br/rss.xml`
   - Lista: `Quinta do Desabafo`
   - Frequência: semanal, às **quintas, 12h**. O Brevo só envia se houver artigo novo, e o artigo precisa estar no ar pelo menos 1 hora antes.
   - Remetente: o do passo 2
   - Modelo: use a moldura de [`modelo-email-semanal.html`](modelo-email-semanal.html), com o bloco de RSS no lugar marcado.
3. Mande um envio de teste para você antes de ativar.

Se preferir, faça o login no Brevo pelo navegador aqui do Claude e me chame. Eu conduzo os passos 4 e 6 na tela com você, e você só confirma.

## Como saber se está funcionando
- **Inscrições:** no Brevo, em **Contatos**. Só aparece quem confirmou pelo e-mail.
- **Envios:** em **Campanhas**, com abertura e cliques de cada quinta.
- **No site:** o Google Analytics registra `sign_up` (inscrição enviada) e `newsletter_confirmada` (inscrição confirmada).
