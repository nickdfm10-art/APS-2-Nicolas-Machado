/* ========================================================
   FUNÇÕES DE VALIDAÇÃO (Centralizadas - RF05)
   ======================================================== */

function validaPeso(peso) {
    return peso >= 0 && peso <= 1000;
}

function validaAltura(altura) {
    return altura >= 0 && altura <= 3.00;
}

function validaPaciente(paciente) {
    var erros = [];

    if (paciente.nome.length === 0) erros.push("O nome não pode ficar em branco.");
    if (paciente.gordura.length === 0) erros.push("A gordura não pode ficar em branco.");
    if (paciente.peso.length === 0) erros.push("O peso não pode ficar em branco.");
    if (paciente.altura.length === 0) erros.push("A altura não pode ficar em branco.");
    
    // Validações lógicas utilizando as funções reutilizáveis
    if (!validaPeso(paciente.peso) && paciente.peso.length > 0) erros.push("Peso é inválido.");
    if (!validaAltura(paciente.altura) && paciente.altura.length > 0) erros.push("Altura é inválida.");

    return erros;
}

/* ========================================================
   MANIPULAÇÃO DA TABELA (Montagem dos elementos)
   ======================================================== */

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    // pacienteTr.appendChild(montaTd(paciente.imc, "info-imc")); // Descomente se tiver a função calculaImc

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

/* ========================================================
   LÓGICA PRINCIPAL (Cadastro e Eventos)
   ======================================================== */

var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    
    // Captura dos dados
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value
    };

    // Validação
    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        var ul = document.querySelector("#mensagens-erro");
        ul.innerHTML = ""; // Limpa erros antigos (RF09)
        erros.forEach(erro => {
            var li = document.createElement("li");
            li.textContent = erro;
            ul.appendChild(li);
        });
        return; // Interrompe o cadastro
    }

    // Inclusão na tabela (Sucesso)
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(montaTr(paciente));

    form.reset(); // Limpa formulário (RF10)
    document.querySelector("#mensagens-erro").innerHTML = ""; // Remove mensagens (RF10)
});