# leticiaferracioli.com.br

Site da Letícia Ferracioli (@leferracioli): mentoria e consultoria comercial, e a **Quinta do Desabafo**, o blog com um artigo toda quinta sobre vendas, gestão comercial, IA em vendas e marketing digital.

Feito com [Astro](https://astro.build). As páginas são estáticas e cada artigo é um arquivo `.mdx` dentro do projeto. Só o recebimento dos formulários roda no servidor (uma função da Vercel), gravando numa planilha do Google.

**Sumário**

1. [Como publicar um artigo novo](#1-como-publicar-um-artigo-novo)
2. [Como rodar o site no seu computador](#2-como-rodar-o-site-no-seu-computador)
3. [Como fazer o deploy e conectar o domínio](#3-como-fazer-o-deploy-e-conectar-o-domínio)
4. [Onde fica cada coisa](#4-onde-fica-cada-coisa)
5. [Planilha de leads e temas](#5-planilha-de-leads-e-temas)
6. [Medição: banner de cookies, Tag Manager e Analytics](#6-medição-banner-de-cookies-tag-manager-e-analytics)

---

## 1. Como publicar um artigo novo

### Passo 1 · Criar o arquivo

1. Copie o arquivo [`MODELO-ARTIGO.mdx`](MODELO-ARTIGO.mdx), que fica na raiz do projeto.
2. Cole dentro da pasta `src/content/artigos/`.
3. Renomeie como `NN-endereco-do-artigo.mdx`, com o número da edição na frente. Exemplo: `02-meta-batida-time-esgotado.mdx`.

O número no nome do arquivo serve só para manter a pasta em ordem. O que vale de verdade é o campo `edicao`.

### Passo 2 · Preencher o frontmatter

O frontmatter é o bloco entre as duas linhas `---` no topo do arquivo. Campos:

| Campo | O que colocar | Regra |
|---|---|---|
| `title` | Título com a palavra-chave perene, de preferência em pergunta | Obrigatório |
| `description` | Meta description que aparece no Google | **Até 155 caracteres** |
| `slug` | O endereço do artigo: `ia-vai-substituir-sdr` vira `/desabafos/ia-vai-substituir-sdr` | Só minúsculas, números e hífen |
| `publishedAt` | Data da quinta em que vai ao ar, no formato `2026-10-29` | Obrigatório |
| `updatedAt` | Data da última atualização (opcional) | Mesmo formato |
| `edicao` | Número do Desabafo: 1, 2, 3... | **Não pode repetir** |
| `palavraChave` | A busca principal que o artigo mira | Obrigatório |
| `variacoes` | Outras formas de buscar o mesmo assunto | Lista |
| `tema` | `vendas`, `gestão comercial`, `IA em vendas` ou `marketing digital` | Exatamente um desses |
| `palavraDestaque` | A palavra do título que fica em itálico laranja | **Precisa estar no `title`** |
| `resumoDireto` | A resposta direta em 2 ou 3 frases, literal. É o trecho que as IAs citam | Obrigatório |
| `capa` e `capaAlt` | Imagem de capa e a descrição dela (ver Passo 4) | Opcionais; se tiver capa, `capaAlt` é obrigatório |
| `faq` | Perguntas frequentes: lista de `pergunta` e `resposta` | 3 a 5 é o ideal |
| `fontes` | Lista de `titulo` e `url`. A ordem define o número de cada fonte | **Todas com link para publicar** |
| `draft` | `true` = rascunho; `false` = publicado | Ver Passo 5 |

Se algum campo estiver errado, o site não é gerado e o erro aparece em português, dizendo qual campo corrigir. Por exemplo: "A description passou de 155 caracteres".

### Passo 3 · Escrever o texto

Abaixo do frontmatter, o texto é Markdown comum: `## Intertítulo`, `*itálico*`, `**negrito**`, listas com `-` e `> ressalva`. Use intertítulos em forma de pergunta: é assim que as pessoas buscam.

Os blocos especiais já funcionam sem nenhuma configuração:

| Bloco | Para quê | Exemplo |
|---|---|---|
| `<Ref n={1} />` | Chamada numérica da fonte nº 1, no fim da frase | `...em 2026.<Ref n={1} />` |
| `<Nota n={1}>...</Nota>` | Nota na margem com a fonte (abaixo do parágrafo no celular) | Logo depois do parágrafo |
| `<Dado numero="54%" fonte="...">...</Dado>` | Número grande + o que significa + fonte | Quebra o ritmo a cada 3–4 blocos |
| `<Citacao>...</Citacao>` | Frase do próprio artigo em destaque | Uma por artigo basta |
| `<Vozes intro="...">` + `<Voz ... />` | "O que outras pessoas estão dizendo?" | Só pessoas reais, com fonte |
| `<Desabafo>...</Desabafo>` | A parte pessoal, em carvão com a foto | Texto em primeira pessoa |
| `<Pergunta>...</Pergunta>` | Pergunta final para o leitor | No fim da reflexão |
| `<Pendente>...</Pendente>` | Marca algo que ainda falta preencher | Aparece destacado |

O modelo e o artigo Nº 01 (`src/content/artigos/01-ia-vai-substituir-sdr.mdx`) mostram cada bloco em uso. O índice lateral, a capitular, o tempo de leitura, o FAQ, as fontes, o "Próximo desabafo", a imagem de compartilhamento e os dados para o Google são montados sozinhos.

### Passo 4 · Capa (opcional)

1. Coloque a imagem em `src/assets/capas/`. Use JPG, PNG ou WebP, com pelo menos 1200 px de largura.
2. No frontmatter, aponte para ela e descreva a imagem:
   ```yaml
   capa: ../../assets/capas/nome-da-imagem.jpg
   capaAlt: "Vendedora ao telefone diante de um notebook com o CRM aberto"
   ```

A capa vira a imagem que aparece quando alguém compartilha o link (WhatsApp, LinkedIn, X), recortada em 1200×630. Sem capa, o site gera uma imagem automaticamente na identidade do blog, e para a maioria dos artigos isso basta.

### Passo 5 · Rascunho → publicado

- Com `draft: true`, o artigo aparece só no seu computador (`npm run dev`) e nunca vai para o site.
- Para publicar, troque para `draft: false`. Antes, confira:
  - todas as `fontes` têm `url`;
  - não sobrou nenhum `<Pendente>`.

  Se faltar algum dos dois, o site não é gerado, justamente para nada ir ao ar pela metade.

### Passo 6 · Mandar para o ar

Salve e envie para o GitHub. Pode ser pelo VS Code, pelo GitHub Desktop ou pelo terminal:

```bash
git add -A
git commit -m "Desabafo Nº 02"
git push
```

Com o deploy configurado (seção 3), a Vercel publica sozinha em 1 a 2 minutos. O sitemap, o RSS e o `llms.txt` também se atualizam sozinhos.

---

## 2. Como rodar o site no seu computador

É preciso ter o [Node.js](https://nodejs.org) 22.23 ou mais novo (o projeto foi feito com o 24).

Abra o terminal dentro da pasta `blog/` e rode:

```bash
npm install
```

Depois, para abrir o site com os rascunhos:

```bash
npm run dev
```

O site abre em **http://localhost:4321** e se atualiza sozinho a cada arquivo salvo. Rascunhos aparecem aqui, com os campos pendentes destacados.

Outros comandos úteis:

| Comando | O que faz |
|---|---|
| `npm run build` | Gera o site final na pasta `dist/` (igual ao que vai para o ar). Para se houver erro de frontmatter ou campo pendente |
| `npm run preview` | Mostra a versão final gerada pelo `build` |
| `npx astro check` | Procura erros no código |

Para testar a versão final **com os rascunhos** (eles saem com `noindex`), no PowerShell:

```powershell
$env:INCLUIR_RASCUNHOS="1"; npm run build; npm run preview
```

---

## 3. Como fazer o deploy e conectar o domínio

O site é estático, então funciona em qualquer hospedagem desse tipo. A recomendação é a **Vercel**: plano gratuito, entende Astro sozinha e publica a cada `git push`.

> **Por que não a Cloudflare?** Ela também funciona, mas bloqueia os robôs de IA por padrão em domínios novos, e isso vai contra o objetivo de aparecer no ChatGPT, no Perplexity e no Gemini. Se um dia usar a Cloudflare, desligue o bloqueio em **AI Crawl Control**.

### 3.1 Primeiro deploy

1. Entre em [vercel.com](https://vercel.com) com a sua conta do GitHub.
2. Clique em **Add New → Project** e escolha o repositório `quinta-do-desabafo`.
3. A Vercel detecta o Astro sozinha: o comando de build é `npm run build` e a pasta é `dist`. Não precisa mudar nada.
4. Em **Environment Variables**, adicione:
   - `SITE_URL` = o endereço do site. Enquanto não houver domínio, use o endereço que a Vercel vai criar (algo como `https://quinta-do-desabafo.vercel.app`).
5. Clique em **Deploy**.

> **Atenção:** o build para se a página Sobre ainda tiver campos `[ ... ]`. Preencha antes do primeiro deploy, ou adicione temporariamente a variável `PERMITIR_PENDENTES` = `1` (e remova quando preencher).

### 3.2 Conectar o domínio próprio

1. Na Vercel, abra o projeto e vá em **Settings → Domains → Add**. Digite o domínio, por exemplo `seudominio.com.br`, e adicione também o `www.seudominio.com.br`.
2. A Vercel mostra quais registros DNS criar. Normalmente são:
   - tipo **A**, nome `@` (o domínio sem www), valor `76.76.21.21`;
   - tipo **CNAME**, nome `www`, valor `cname.vercel-dns.com`.

   **Use os valores exatos que a Vercel mostrar**: eles podem mudar.
3. No site onde o domínio foi comprado, crie esses registros. No **registro.br**:
   1. Entre em **Domínios** e clique no seu domínio.
   2. Em **DNS**, use os servidores do próprio Registro.br.
   3. Clique em **Configurar zona DNS** e adicione os registros.
4. Espere a propagação, que vai de minutos a algumas horas. A Vercel avisa quando o domínio estiver ativo e cria o certificado HTTPS sozinha.
5. Volte em **Settings → Environment Variables**, troque `SITE_URL` para `https://seudominio.com.br` e faça um novo deploy em **Deployments → … → Redeploy**. Isso atualiza o canonical, o sitemap, o RSS e as imagens de compartilhamento.

### 3.3 Avisar o Google e o Bing (uma vez só)

1. **[Google Search Console](https://search.google.com/search-console):**
   1. Adicione o domínio e confirme a propriedade com o registro TXT que ele pedir (no mesmo lugar do DNS).
   2. Em **Sitemaps**, envie `sitemap-index.xml`.
2. **[Bing Webmaster Tools](https://www.bing.com/webmasters):** dá para importar direto do Search Console. O índice do Bing alimenta o ChatGPT Search e o Copilot, então vale fazer.

Depois do domínio no ar, vale rodar o Lighthouse de novo (Chrome → DevTools → Lighthouse → Mobile) para conferir os números no servidor de verdade.

---

## 4. Onde fica cada coisa

```
blog/
├── MODELO-ARTIGO.mdx          ← copie para criar um artigo
├── src/
│   ├── content/artigos/       ← os artigos (.mdx)
│   ├── paginas/sobre.mdx      ← o texto da página Sobre
│   ├── paginas/privacidade.mdx ← a política de privacidade e cookies
│   ├── lib/solucoes.ts        ← os textos da mentoria e da consultoria
│   ├── assets/                ← fotos (e capas/, para as capas dos artigos)
│   ├── content.config.ts      ← as regras do frontmatter
│   ├── lib/site.ts            ← nome, WhatsApp (e a mensagem pronta) e redes
│   ├── lib/temas.ts           ← a lista de temas
│   ├── styles/tokens.css      ← cores, fontes e tamanhos
│   ├── components/            ← peças visuais (artigo/ = blocos do texto)
│   └── pages/                 ← as páginas e os arquivos gerados
│       ├── index.astro        ← home (apresentação, soluções, desabafo da semana, contato)
│       ├── solucoes.astro, contato.astro, privacidade.astro
│       ├── api/formulario.ts  ← recebe os formulários e grava na planilha
│       ├── desabafos/         ← a Quinta do Desabafo: capa da semana, temas e cada artigo
│       ├── sobre.astro, 404.astro
│       ├── og/                ← imagens de compartilhamento
│       └── robots.txt, rss.xml, llms.txt
└── public/                    ← arquivos servidos como estão (favicon)
```

**Identidade visual**
- Cores: carvão `#2a2a2c`, areia `#efeae3`, laranja `#e0662f`, taupe `#a89f94` e pedra `#cfc7bc`. Os tons derivados que garantem contraste estão em `tokens.css`.
- Fontes: Fraunces, a voz editorial (títulos, números, citações), e Jost, a leitura (corpo, metadados).

---

## 5. Planilha de leads e temas

Os formulários de contato (home e `/contato`) e o "Sugira um desabafo" (fim de cada artigo) gravam numa planilha do Google, com a origem da visita: página, site de onde a pessoa veio e UTMs do primeiro acesso.

### Instalação (uma vez só)

1. Crie uma planilha nova no Google Planilhas, por exemplo "Site · leads e temas".
2. Menu **Extensões → Apps Script**. Apague o que aparecer e cole todo o conteúdo de [`planilha/apps-script.gs`](planilha/apps-script.gs).
3. Na linha `const TOKEN = '...'`, troque pelo código secreto. Ele está no arquivo `token-planilha.txt`, na pasta do projeto (fora do repositório), e já está configurado na Vercel como `PLANILHA_TOKEN`.
4. Clique em **Implantar → Nova implantação**, escolha o tipo **App da Web** e configure:
   - **Executar como:** Eu;
   - **Quem pode acessar:** Qualquer pessoa.

   O Google vai pedir para você autorizar o script a editar a planilha: autorize.
5. Copie o **URL do app da Web** (termina em `/exec`).
6. Na Vercel, em **Settings → Environment Variables**, crie `PLANILHA_URL` com esse endereço (Production e Preview) e faça um **Redeploy**.

As abas **Leads** e **Temas sugeridos** aparecem sozinhas no primeiro envio.

> O endereço `/exec` só aceita envios com o código secreto. Sem ele, nada é gravado. Se você mudar o código no Apps Script, mude também `PLANILHA_TOKEN` na Vercel.

### Se um formulário falhar

A pessoa vai para uma página que oferece o WhatsApp como alternativa, e o erro aparece nos logs da Vercel (**Project → Logs**). As causas mais comuns são `PLANILHA_URL` não configurada ou o código secreto diferente nos dois lugares.

### Links do Instagram com UTM

Para saber qual post trouxe cada lead, use links assim na bio e nos stories:

```
https://www.leticiaferracioli.com.br/desabafos/?utm_source=instagram&utm_medium=bio&utm_campaign=quinta-desabafo
https://www.leticiaferracioli.com.br/desabafos/ia-vai-substituir-sdr/?utm_source=instagram&utm_medium=stories&utm_campaign=desabafo-01
```

---

## 6. Medição: banner de cookies, Tag Manager e Analytics

- **Banner de cookies** (`src/components/Consentimento.astro`): o Google Tag Manager (`GTM-WN7GRKNK`) só carrega depois que a pessoa clica em **Aceitar**. O link **Preferências de cookies** no rodapé reabre o banner.
- **Eventos enviados ao Tag Manager** (`src/components/Eventos.astro`):

| Evento | Quando acontece |
|---|---|
| `clique_whatsapp` | clique em qualquer botão ou link do WhatsApp |
| `generate_lead` | formulário de contato enviado com sucesso |
| `sugestao_tema` | sugestão de tema enviada com sucesso |

- **Configuração do Tag Manager:** o arquivo [`gtm/container-leticiaferracioli.json`](gtm/container-leticiaferracioli.json) traz a tag do GA4 (`G-M4ZNQFQ3S4`) e os três eventos. Para importar: **Administrador → Importar contêiner → escolha o arquivo → espaço de trabalho existente → Mesclar → Substituir tags conflitantes → Confirmar**, e depois **Enviar → Publicar**.
- **No Google Analytics:**
  - marque `generate_lead` e `clique_whatsapp` como **eventos principais** (Administrador → Eventos);
  - crie o canal **IA** em Administrador → Exibição de dados → Grupos de canais, com a origem da sessão correspondendo à expressão `chatgpt|openai|perplexity|gemini|copilot|claude|bard`.
