# TaskFlow

Sistema web simples de gerenciamento de tarefas, com o lema **"Organize suas tarefas, simplifique sua rotina"**.

O objetivo é servir como projeto-base de uma atividade acadêmica sobre DevOps, Git, GitHub, ambientes de desenvolvimento e produção, Oracle Cloud Free Tier e CI/CD.

## Funcionalidades implementadas

- Adicionar tarefas com título e descrição opcional (também com Enter no campo de título).
- Impedir o cadastro de tarefas com título vazio.
- Listar todas as tarefas, exibindo a data de criação de cada uma.
- Marcar tarefas como concluídas e desmarcá-las.
- Excluir tarefas.
- Filtrar por todas, pendentes e concluídas.
- Contadores de tarefas totais, pendentes e concluídas.
- Mensagem amigável quando não há tarefas.
- Salvamento automático no `localStorage` do navegador.

## Tecnologias utilizadas

- HTML5 (semântico)
- CSS3 (responsivo, com media queries)
- JavaScript puro (sem frameworks, sem bibliotecas, sem Node.js/npm)

## Estrutura de arquivos

```
TaskFlow/
├── index.html   # estrutura da página
├── style.css    # estilos e responsividade
├── script.js    # lógica da aplicação
├── README.md    # documentação
└── .gitignore   # arquivos ignorados pelo Git
```

## Requisitos para executar

Apenas um navegador moderno (Chrome, Edge, Firefox, Safari). Não é necessário instalar nada.

## Como abrir localmente

1. Baixe ou clone a pasta `TaskFlow`.
2. Dê dois cliques em `index.html` (ou arraste o arquivo para a janela do navegador).

## Sobre o localStorage

As tarefas ficam salvas **somente no navegador e no computador em que foram criadas**. Limpar os dados do navegador apaga as tarefas, e outro navegador ou dispositivo não as enxerga. Por isso, o `localStorage` **não substitui um banco de dados**.

## Versionamento com Git e GitHub (início)

```bash
git init
git add .
git commit -m "Primeira versão do TaskFlow"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/TaskFlow.git
git push -u origin main
```

Crie antes um repositório vazio no GitHub e troque `SEU-USUARIO` pelo seu nome de usuário.

## Próximas etapas (ainda não implementadas)

- Implantação na Oracle Cloud Free Tier.
- Automação de CI/CD.

Essas etapas são planejadas para o futuro e **ainda não foram feitas**: o sistema não está hospedado e não há pipeline configurado.
