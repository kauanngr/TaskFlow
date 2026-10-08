// TaskFlow - lógica da aplicação (JavaScript puro)

const CHAVE_STORAGE = "taskflow.tarefas";

// Estado da aplicação
let tarefas = [];
let filtroAtual = "todas";

// Elementos da página
const formulario = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoDescricao = document.getElementById("descricao");
const erroTitulo = document.getElementById("erro-titulo");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");
const botoesFiltro = document.querySelectorAll(".filtro");

const contadorTotal = document.getElementById("contador-total");
const contadorPendentes = document.getElementById("contador-pendentes");
const contadorConcluidas = document.getElementById("contador-concluidas");

// ===== Armazenamento =====

function carregarTarefas() {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    const dados = salvo ? JSON.parse(salvo) : [];
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    // Dados corrompidos ou localStorage indisponível
    return [];
  }
}

function salvarTarefas() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
  } catch (erro) {
    console.warn("Não foi possível salvar as tarefas neste navegador.");
  }
}

// ===== Ações =====

function criarTarefa(titulo, descricao) {
  return {
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    titulo: titulo,
    descricao: descricao,
    concluida: false,
    criadaEm: new Date().toISOString()
  };
}

function adicionarTarefa(titulo, descricao) {
  tarefas.unshift(criarTarefa(titulo, descricao)); // mais recente primeiro
  salvarTarefas();
  renderizar();
}

function alternarConclusao(id) {
  const tarefa = tarefas.find(function (t) { return t.id === id; });
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    salvarTarefas();
    renderizar();
  }
}

function excluirTarefa(id) {
  tarefas = tarefas.filter(function (t) { return t.id !== id; });
  salvarTarefas();
  renderizar();
}

function definirFiltro(filtro) {
  filtroAtual = filtro;
  botoesFiltro.forEach(function (botao) {
    const ativo = botao.dataset.filtro === filtro;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
  renderizar();
}

// ===== Exibição =====

function formatarData(iso) {
  const data = new Date(iso);
  if (isNaN(data.getTime())) return "";
  return data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function filtrarTarefas() {
  if (filtroAtual === "pendentes") return tarefas.filter(function (t) { return !t.concluida; });
  if (filtroAtual === "concluidas") return tarefas.filter(function (t) { return t.concluida; });
  return tarefas;
}

function atualizarContadores() {
  const concluidas = tarefas.filter(function (t) { return t.concluida; }).length;
  contadorTotal.textContent = tarefas.length;
  contadorConcluidas.textContent = concluidas;
  contadorPendentes.textContent = tarefas.length - concluidas;
}

function textoMensagemVazia() {
  if (tarefas.length === 0) return "Nenhuma tarefa por aqui ainda. Adicione a primeira no formulário acima!";
  if (filtroAtual === "pendentes") return "Nenhuma tarefa pendente. Bom trabalho!";
  return "Nenhuma tarefa concluída ainda.";
}

// Monta um item da lista usando apenas métodos seguros do DOM (textContent)
function criarItemTarefa(tarefa) {
  const item = document.createElement("li");
  item.className = "tarefa" + (tarefa.concluida ? " concluida" : "");

  const caixa = document.createElement("input");
  caixa.type = "checkbox";
  caixa.id = "tarefa-" + tarefa.id;
  caixa.checked = tarefa.concluida;
  caixa.setAttribute("aria-label", "Marcar \"" + tarefa.titulo + "\" como concluída");
  caixa.addEventListener("change", function () { alternarConclusao(tarefa.id); });

  const conteudo = document.createElement("div");
  conteudo.className = "tarefa-conteudo";

  const titulo = document.createElement("div");
  titulo.className = "tarefa-titulo";
  titulo.textContent = tarefa.titulo;
  conteudo.appendChild(titulo);

  if (tarefa.descricao) {
    const descricao = document.createElement("p");
    descricao.className = "tarefa-descricao";
    descricao.textContent = tarefa.descricao;
    conteudo.appendChild(descricao);
  }

  const data = document.createElement("p");
  data.className = "tarefa-data";
  data.textContent = "Criada em " + formatarData(tarefa.criadaEm);
  if (tarefa.concluida) {
    const status = document.createElement("span");
    status.className = "tarefa-status";
    status.textContent = " · Concluída";
    data.appendChild(status);
  }
  conteudo.appendChild(data);

  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.className = "botao-excluir";
  botaoExcluir.textContent = "✕ Excluir";
  botaoExcluir.setAttribute("aria-label", "Excluir tarefa \"" + tarefa.titulo + "\"");
  botaoExcluir.addEventListener("click", function () { excluirTarefa(tarefa.id); });

  item.appendChild(caixa);
  item.appendChild(conteudo);
  item.appendChild(botaoExcluir);
  return item;
}

function renderizar() {
  atualizarContadores();
  listaTarefas.replaceChildren();

  const visiveis = filtrarTarefas();
  visiveis.forEach(function (tarefa) {
    listaTarefas.appendChild(criarItemTarefa(tarefa));
  });

  if (visiveis.length === 0) {
    mensagemVazia.textContent = textoMensagemVazia();
    mensagemVazia.hidden = false;
  } else {
    mensagemVazia.hidden = true;
  }
}

// ===== Eventos =====

// O Enter no campo de título envia o formulário automaticamente
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const titulo = campoTitulo.value.trim();
  const descricao = campoDescricao.value.trim();

  if (titulo === "") {
    erroTitulo.textContent = "Digite um título para a tarefa.";
    campoTitulo.classList.add("invalido");
    campoTitulo.focus();
    return;
  }

  erroTitulo.textContent = "";
  campoTitulo.classList.remove("invalido");

  adicionarTarefa(titulo, descricao);
  formulario.reset();
  campoTitulo.focus();
});

campoTitulo.addEventListener("input", function () {
  erroTitulo.textContent = "";
  campoTitulo.classList.remove("invalido");
});

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () { definirFiltro(botao.dataset.filtro); });
});

// ===== Início =====
tarefas = carregarTarefas();
renderizar();
