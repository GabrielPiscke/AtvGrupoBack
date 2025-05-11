 
// rendizar lista de emprestimos
function criarListaTurmas(data){
   let colunas = document.getElementById("colunas");
        let lista = document.getElementById("listaTurmas");
        lista.innerHTML = "";
        colunas.innerHTML = "";
            
        //colunas
            let idColun = document.createElement("th");
            idColun.scope = "col";
            idColun.textContent = "Id";

            let nomeColun = document.createElement("th");
            nomeColun.scope = "col";
            nomeColun.textContent = "Nome da Turma";

            let siglaColun = document.createElement("th");
            siglaColun.scope = "col";
            siglaColun.textContent = "Sigla";

            let numeroColun = document.createElement("th");
            numeroColun.scope = "col";
            numeroColun.textContent = "Número da Sala";

            let professorColun = document.createElement("th");
            professorColun.scope = "col";
            professorColun.textContent = "Professor";

            let acoesColun = document.createElement("th");
            acoesColun.scope = "col";
            acoesColun.textContent = "Ações";

            colunas.appendChild(idColun);
            colunas.appendChild(nomeColun);
            colunas.appendChild(siglaColun);
            colunas.appendChild(numeroColun);
            colunas.appendChild(professorColun);
            colunas.appendChild(acoesColun);

        //linhas
        data.forEach(turma => {
             
        let linha = document.createElement("tr");
        
        // Colunas: ID, Nome, CPF
            let id = document.createElement("th");
            id.scope = "row"; // Acessibilidade
            id.textContent = turma.id;
        
            let nome = document.createElement("td");
            nome.textContent = turma.nome;
        
            let sigla = document.createElement("td");
            sigla.textContent = turma.sigla;

            let numero = document.createElement("td");
            numero.textContent = turma.numeroSala;

            let professor = document.createElement("td");
            professor.textContent = turma.nomeProfessor || "Sem professor";

        
            linha.appendChild(id);
            linha.appendChild(nome);
            linha.appendChild(sigla);
            linha.appendChild(numero);
            linha.appendChild(professor);
        
        // Botão Editar
            let tdEditar = document.createElement("td"); // célula para o botão
            let btnEditar = document.createElement("button");
              
            btnEditar.classList.add("btn", "btn-warning", "btn-sm", "me-2");
            btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
            btnEditar.onclick = function () {
                window.open(`turmaEdit.html?id=${turma.id}`, "_blank");
            };
            tdEditar.appendChild(btnEditar);
        
        // Botão Deletar
            let btnDeletar = document.createElement("button");
            btnDeletar.classList.add("btn", "btn-outline-danger", "btn-sm");
            btnDeletar.innerHTML = `<i class="bi bi-trash"></i> Deletar`;
            btnDeletar.onclick = function () {
                deletarTurma(turma.id);
            };
            tdEditar.appendChild(btnDeletar);
        
            linha.appendChild(tdEditar);
        
        // Adiciona a linha completa à tabela
            lista.appendChild(linha);
        });
}

// preencher o campo select, com os clientes que estão no banco de dados
function criarCampoSelectProfessor(data){
    let select = document.getElementById("professorSelect");
    // prenche o dropDown(com os dados)
    data.forEach(professor => {
        let option = document.createElement("option");
        option.value = professor.id; // valor que sera enviado ao fazer o submit do form
        option.textContent = professor.nome; // nome que aparece para selecionar
        select.appendChild(option);
    });
}

// criar CheckBox dos livros que estão salvos no banco de dados
function criarCheckBoxAlunos(data){
     const container = document.getElementById("alunosContainer");
    container.innerHTML = ""; // limpa conteúdo anterior se houver

    data.forEach(aluno => {
        let wrapper = document.createElement("div");
        wrapper.classList.add("form-check", "mb-2");

        let checkbox = document.createElement("input");
        checkbox.classList.add("form-check-input");
        checkbox.type = "checkbox";
        checkbox.name = "alunos";
        checkbox.value = aluno.id;

        let label = document.createElement("label");
        label.classList.add("form-check-label");
        label.textContent = aluno.nome;

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);

        container.appendChild(wrapper);
    });
}

// Buscar Clientes
async function getProfessores(){
    try {
        let response = await fetch("http://localhost:8080/professor", {
        method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        criarCampoSelectProfessor(data)
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}

// Buscar Livros
async function getAlunos(){
    try {
        let response = await fetch("http://localhost:8080/aluno", {
        method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        criarCheckBoxAlunos(data)
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}


// cria objeto para ser enviado na requisição
function criarObjetoTurma(){
    // Pegar todos os checkboxes selecionados
    let checkboxes = document.querySelectorAll('input[name="alunos"]:checked');

    // Mapear os valores para um array de objetos com { id: x }
    let alunosSelecionados = Array.from(checkboxes).map(cb => ({
        id: parseInt(cb.value)
    }));
    
    let formData = {
        sigla: document.getElementById("sigla").value,
        numeroSala: document.getElementById("numeroSala").value,
        nome: document.getElementById("nomeTurma").value,
        professor:{
            id: parseInt(document.getElementById("professorSelect").value)
        },
        alunos: alunosSelecionados
    };

    return formData;
}
// enviar emprestimo
async function postTurma(event) {
    event.preventDefault();
    
    let formData = criarObjetoTurma();
    
    try {
        let response = await fetch("http://localhost:8080/turma", {
        method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        alert("Sucesso: " + JSON.stringify(data));
        getTurma();
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}

// buscar lista de emprestimos
async function getTurma() {
    let nome = document.getElementById("nomeBusca").value;
    const url = `http://localhost:8080/turma?nome=${nome}`;
    console.log("Fazendo requisição para:", url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        console.log("Status da resposta:", response.status);

        if (!response.ok) {
            console.error("Erro HTTP:", response.status);
            alert("Erro do back-end: " + response.status);
            return;
        }

        const data = await response.json();
        console.log("Resposta JSON:", data);

        criarListaTurmas(data);
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição: " + error.message);
    }
}


// deletar emprestimo
async function deletarTurma(id) {
    if (confirm("Tem certeza que deseja deletar essa Turma?")) {
        try {
            let response = await fetch(`http://localhost:8080/turma/${id}`, {
            method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if(!response.ok){
                alert("Erro do back-end" + response.status)
                return
            }
            alert("Turma deletada com sucesso!");
            getTurma();
        } catch (error) {
            alert("Erro na requisição: " + error.message)
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    getAlunos() // buscar os clientes disponíveis no sistema, assim que a página carregar
    await getProfessores() // buscar os livros disponíveis no sistema assim que a página carregar
    document.getElementById("turmaForm").addEventListener("submit", postTurma);
   document.getElementById("turmaBusca").addEventListener("submit", function(e) {
    e.preventDefault();
    getTurma();
});

});
