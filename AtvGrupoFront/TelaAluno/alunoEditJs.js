// Função para buscar os dados do Livro (GET)
function paramUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        getAlunoPorId(id);
    }
}

function preencheCamposForm(data) {
    document.getElementById("alunoId").value = data.id;
    document.getElementById("nome").value = data.nome;
    document.getElementById("cpf").value = data.cpf;
    document.getElementById("turma").value = data.turma;
}

async function getAlunoPorId(id) {
    try {
        let response = await fetch(`http://localhost:8080/aluno/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            alert("Erro do back-end " + response.status);
            return;
        }

        let data = await response.json();
        preencheCamposForm(data); // Preenche os campos do formulário com os dados recebidos

    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
}

// Função para criar objeto com os dados do formulário
function criarObjeto() {
    let formData = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        turma: document.getElementById("turma").value,
    };

    return formData;
}

// Função para editar aluno (PUT)
async function putAluno(event) {
    event.preventDefault();
    let id = document.getElementById("alunoId").value;

    let formData = criarObjeto(); // Corrigido: chamando a função correta

    try {
        let response = await fetch(`http://localhost:8080/aluno/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            alert("Erro do back-end " + response.status);
            return;
        }

        let data = await response.json();
        alert("Sucesso: " + JSON.stringify(data));

    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("alunoForm").addEventListener("submit", putAluno); // Corrigido: nome da função
    paramUrl(); // Chama a função para verificar o id na URL
});
