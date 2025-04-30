function paramUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        getProfessorPorId(id);
    } else {
        alert("ID do professor não encontrado na URL.");
    }
}

function preencheCamposDoForm(data) {
    document.getElementById("nome").value = data.nome;
    document.getElementById("sobrenome").value = data.sobrenome;

}

async function getProfessorPorId(id) {
    try {
        let response = await fetch(`http://localhost:8080/professor/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            alert("Erro do back-end " + response.status);
            return;
        }

        let data = await response.json();
        preencheCamposDoForm(data);
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
}

function criarObjetoJson() {
    let formData = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
    };
    return formData;
}

async function putProfessor(event) {
    event.preventDefault();
    
    let id = document.getElementById("professorId").value;
    if (!id) {
        alert("ID do professor não encontrado.");
        return;
    }
    
    let formData = criarObjetoJson();

    try {
        let response = await fetch(`http://localhost:8080/professor/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok && response.status !== 204) {
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
    document.getElementById("professorForm").addEventListener("submit", putProfessor);
    paramUrl();
});
