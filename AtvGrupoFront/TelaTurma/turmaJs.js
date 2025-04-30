 
// rendizar lista de emprestimos
function criarListaTurmas(data){
    let lista = document.getElementById("listaTurmas");
    lista.innerHTML = "";
    data.forEach(turma => {
        let item = document.createElement("li");
        item.textContent = `ID: ${turma.id} - Número da Sala: ${turma.numeroSala} - Sigla: ${turma.sigla}
            - Professor: ${turma.professor?.nome || "sem nome"} - Alunos: ${turma.aluno?.nome || "sem nome"}`; // Se o nome no banco de dados for null, entao ele retorna "sem nome"
            // se existir um nome apenas exibe o nome. Evitando assim erro
        
        // botão de editar
        let btnLink = document.createElement("button");
        btnLink.textContent = "Editar";
        btnLink.target = "_blank";
        btnLink.style.marginLeft = "10px";
        btnLink.onclick = function() {
            window.open(`turmaEdit.html?id=${turma.id}`, '_blank');
        };
        item.appendChild(btnLink);

        // botão de editar
        let btnDeletar = document.createElement("button")
        btnDeletar.textContent = "Deletar";
        btnDeletar.style.marginLeft = "10px";
        btnDeletar.onclick = function(){
            deletarTurma(turma.id)
        }
        item.appendChild(btnDeletar);

        lista.appendChild(item);
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
    // Pegando o form
    const form = document.getElementById("turmaForm");

    // Cria os checkboxes
    data.forEach(aluno => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "alunos";
        checkbox.value = aluno.id; // colocar o value do checkbox como o id do livro

        let texto = document.createTextNode(` ${livro.nome}`);
        
        form.insertBefore(checkbox, form.lastElementChild);
        form.insertBefore(texto, form.lastElementChild);
        form.insertBefore(document.createElement("br"), form.lastElementChild);
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
            id: document.getElementById("professorSelect").value
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

    let nomeBusca = document.getElementById("nomeBusca").value; // acrecentando filtro de nome a busca, caso necessário

    try {
        let response = await fetch(`http://localhost:8080/turma?nome=${nomeBusca}`, {
        method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        criarListaTurmas(data);
    } catch (error) {
        alert("Erro na requisição: " + error.message)
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
    document.getElementById("turmaBusca").addEventListener("click", getTurma);
});
