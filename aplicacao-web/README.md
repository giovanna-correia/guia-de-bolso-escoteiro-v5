# Guia de Bolso Escoteiro — aplicação web

## Objetivo

Esta é a versão web da Fase 1 do Guia de Bolso Escoteiro. Ela preserva o conteúdo educativo do aplicativo React Native/Expo original e acrescenta, para demonstração acadêmica, autenticação local e organização de membros, materiais e atividades de um grupo escoteiro.

A implementação original permanece na raiz do projeto. Todo o trabalho novo está isolado nesta pasta `aplicacao-web`.

## Contexto escoteiro

O jovem beneficiário encontra um guia de consulta para nós, amarras, Leis Escoteiras, checklist de acampamento, Código Morse e bússola. O escotista recebe uma área administrativa para acompanhar acessos, patrimônio, atividades, manutenção e necessidades de compra, além de poder abrir o mesmo guia.

## Tecnologias

- HTML5 semântico;
- CSS3 modular e mobile first;
- TypeScript sem framework;
- APIs nativas do navegador, incluindo `localStorage`, `DeviceOrientationEvent` e `<dialog>`;
- Vite 6 somente como servidor de desenvolvimento e compilador.

Não há React, Vue, Angular, biblioteca de interface, backend ou banco de dados online nesta fase.

## Estrutura resumida

```text
aplicacao-web/
├── compartilhado/       # variáveis visuais e tipos comuns
├── componentes/         # cabeçalhos, menus, modal, mensagens e status
├── dados/               # Guia de Bolso e registros demonstrativos
├── modelos/             # modelos TypeScript das entidades
├── paginas/
│   ├── autenticacao/    # login
│   ├── jovem/           # nove páginas do Guia de Bolso
│   └── administracao/   # dezesseis páginas administrativas
├── publico/recursos/    # imagens, ícones e futura inclusão de fontes
├── repositorios/        # acesso ao armazenamento por entidade
├── servicos/            # autenticação e regras de negócio
└── utilitarios/         # armazenamento, datas, validação, texto e URLs
```

Cada pasta em `paginas` contém seu próprio `index.html`, arquivo CSS e arquivo TypeScript. `compartilhado/estilos/variaveis.css` guarda somente variáveis visuais; não funciona como uma folha de estilos global.

## Requisitos e instalação

Use Node.js 18 ou mais recente. A versão validada nesta fase foi Node.js 20.14.0.

```bash
cd aplicacao-web
npm install
```

## Executar localmente

```bash
npm run dev
```

Abra o endereço informado pelo Vite. O arquivo inicial encaminha para a tela de acesso.

## Verificar e compilar

```bash
npm run verificar-tipos
npm run build
```

O build estático é criado em `dist`. Para conferi-lo localmente:

```bash
npm run preview
```

## Credenciais demonstrativas

| Perfil | Registro | PIN | Situação |
| --- | --- | --- | --- |
| Escotista | `000001` | `1234` | Ativo |
| Jovem beneficiário | `100001` | `1111` | Ativo |
| Jovem beneficiário | `100002` | `2222` | Ativo |
| Jovem beneficiário | `100003` | `3333` | Inativo, para testar o bloqueio |

O PIN é apenas demonstrativo e fica salvo localmente. Ele não oferece a proteção necessária para um sistema em produção.

## Perfis e autorização

- `jovem_beneficiario`: entra diretamente no Guia de Bolso e não pode abrir páginas administrativas;
- `escotista`: entra no painel administrativo e também possui acesso ao Guia de Bolso;
- páginas protegidas encaminham usuários sem sessão ao login;
- o logout remove somente a sessão, preservando os demais registros.

Não existe cadastro público. Novos acessos são criados por um escotista no módulo Membros e Acessos.

## Persistência local

Cada entidade usa uma chave JSON própria, prefixada com `guia_escoteiro_`. As páginas conversam com repositórios e não acessam o `localStorage` diretamente. Os dados demonstrativos são criados somente quando a chave ainda não existe, portanto recarregar a página não apaga alterações.

No menu do escotista, a ação **Restaurar dados demonstrativos** recompõe a base inicial depois de uma confirmação explícita.

Os dados ficam somente no navegador ou aparelho atual. Um membro cadastrado em um dispositivo não poderá entrar em outro dispositivo. A versão de produção exigirá banco online, autenticação real, proteção de credenciais e sincronização entre aparelhos.

## Módulos entregues

- autenticação por registro escoteiro e PIN, sessão, autorização por perfil e logout;
- Guia de Bolso: início, nós e detalhes, amarras, Leis Escoteiras, checklist persistente, Morse, bússola e Sobre;
- painel geral com indicadores, alertas, ações rápidas e movimentações;
- membros e acessos, incluindo edição, ativação, desativação e redefinição de PIN;
- materiais, componentes de barraca, disponibilidade, histórico e baixa;
- atividades, carga de materiais, reserva, retirada, devolução e inspeção;
- limpeza e manutenção, custos, conclusão, liberação ou baixa;
- necessidades de compra, cálculos, prioridades e recebimento com entrada em estoque.

## Limitações desta fase

- Não existe backend, banco online ou sincronização entre dispositivos.
- Credenciais e informações são demonstrativas e permanecem no navegador.
- A bússola depende do suporte e da permissão do navegador para orientação do dispositivo; quando indisponível, a tela explica a limitação.
- Links de vídeos e do PDF oficial dependem de internet, mas o restante da aplicação e seus dados essenciais não dependem deles.
- Android Studio, WebView, APK e publicação Android não foram realizados.
- GitHub Pages não foi publicado nem configurado como implantação nesta fase.

## Preparação para GitHub Pages

O Vite usa caminhos de build relativos (`base: './'`) e gera todas as páginas como entradas estáticas. Essa organização reduz o trabalho da fase futura, mas a publicação, o fluxo de implantação e a validação no endereço final ainda precisam ser executados separadamente.

## Preparação para WebView

As rotas e os recursos locais usam caminhos relativos, o layout considera áreas seguras e as telas foram desenhadas para celular primeiro. A futura fase Android ainda deverá criar o contêiner WebView, configurar permissões e navegação externa, empacotar os arquivos e validar sensores em aparelhos reais.

## Recursos visuais pendentes

O projeto React Native recebido não contém a pasta `assets`, embora faça referência às imagens abaixo:

```text
imagem-tela-principal-sem-fundo.png
menu-no-direito.png
menu-amarras.png
menu-acampamento.jpeg
menu-leis-escoteiras.png
menu-bussola.png
menu-morse.png
amarra-quadrada-thumb.png
amarra-diagonal-thumb.png
amarra-paralela-thumb.png
amarra-tripe-thumb.png
no-direito-menu.png
no-escota-menu.png
no-de-pescador-menu.png
no-em-oito-menu.png
```

Os nomes esperados continuam registrados nos dados. Foram usados placeholders SVG locais, discretos e sem dependência externa, até que os arquivos originais sejam fornecidos. As fontes Poppins e Gentium Book Plus também não estavam no pacote; por isso a interface possui pilhas de fontes alternativas e funciona offline sem elas.

## Validação da Fase 1

Foram validados a tipagem, o build multipágina, as rotas protegidas, os dois perfis, a persistência e os principais fluxos de cadastro e movimentação. A responsividade foi exercitada em `360 × 800`, `390 × 844`, `412 × 915`, `768 × 1024` e `1366 × 768`, sem rolagem horizontal nas páginas testadas.
