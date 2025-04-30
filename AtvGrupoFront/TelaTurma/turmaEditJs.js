
// pegar parametro da URL
function paramUrl(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        getTurmaPorId(id);
    }
}

// preenche os dados do Form com base no emprestimo
function preencherFormTurma(data){
    document.getElementById("turmaId").value = data.id;
    document.getElementById("nomeTurma").value = data.nome;
    document.getElementById("sigla").value = data.sigla;
    document.getElementById("numeroSala").value = data.numeroSala;
    document.getElementById("professorSelect").value = data.professor.id;

    let idsAlunosSelecionados = data.alunos.map(aluno => aluno.id)

    let checkboxes = document.querySelectorAll('input[name="alunos"]');
    checkboxes.forEach(checkbox => {
        const id = parseInt(checkbox.value);
        checkbox.checked = idsAlunosSelecionados.includes(id);
    });

}

// criar os campos de select com base nos cliente que estão no banco de dados
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

// criar o checkBox dos livros com base nos livros que estão no banco de dados
function criarCheckBoxAlunos(data){
    // Pegando o form
    const form = document.getElementById("turmaForm");

    // Cria os checkboxes
    data.forEach(aluno => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "alunos";
        checkbox.value = aluno.id;

        let texto = document.createTextNode(` ${aluno.nome}`);
        
        form.insertBefore(checkbox, form.lastElementChild);
        form.insertBefore(texto, form.lastElementChild);
        form.insertBefore(document.createElement("br"), form.lastElementChild);
    });
}

// buscar os clientes(GET)
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

// buscar os livros(GET)
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

// criar objeto que será enviado na requisição PUT
function criarObjeto(){
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

// atualizar emprestimo(PUT)
async function putTurma(event) {
    event.preventDefault();

    let formData = criarObjeto()

    let id = document.getElementById("turmaId").value
    
    try {
        let response = await fetch(`http://localhost:8080/turma/${id}`, {
        method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        alert("Sucesso: " + JSON.stringify(data));
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}

// buscar emprestimo com base no id
async function getTurmaPorId(id) {

    try {
        let response = await fetch(`http://localhost:8080/turma/${id}`, {
        method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        preencherFormTurma(data);
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getProfessores() // quando a página carregar pega os clientes disponíveis no banco de dados
    getAlunos() // quaando a página carregar pega os livros do banco de dados
    paramUrl() // quando a página carregar vai pegar o parametro da URL e depois fazer a requisição nesse emprestimo com base nesse id
    document.getElementById("turmaForm").addEventListener("submit", putTurma);
});
