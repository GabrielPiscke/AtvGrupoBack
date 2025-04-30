
function criarObjetoParaEnviar() {
    let formData = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
    };

    return formData;
}

async function postProfessor(event) {
    event.preventDefault();

    let formData = criarObjetoParaEnviar();

    try {
        let response = await fetch("http://localhost:8080/professor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            alert("Erro do back-end: " + response.status);
            return;
        }

        let data = await response.json();
        alert("Sucesso: " + JSON.stringify(data));
        getProfessor(); 
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
}


function criarListaDeProfessores(data) {
    let lista = document.getElementById("listaProfessores");
    lista.innerHTML = ""; 

    data.forEach(professor => {
        let item = document.createElement("li");
        item.textContent = `ID: ${professor.id} - Nome: ${professor.nome} - Sobrenome: ${professor.sobrenome}`;

        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.style.marginLeft = "10px";
        btnEditar.onclick = function () {
            window.open(`professorEdit.html?id=${professor.id}`, '_blank');
        };
        item.appendChild(btnEditar); 

        let btnDeletar = document.createElement("button");
        btnDeletar.textContent = "Deletar";
        btnDeletar.style.marginLeft = "10px";
        btnDeletar.onclick = function () {
            deletarProfessor(professor.id);
        };
        item.appendChild(btnDeletar);

        lista.appendChild(item);
    });
}

async function getProfessor() {
    let nome = document.getElementById("buscarNome").value; 
    try {
        let response = await fetch(`http://localhost:8080/professor?nome=${nome}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            alert("Erro do back-end: " + response.status);
            return;
        }

        let data = await response.json();
        criarListaDeProfessores(data);
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
}


async function deletarProfessor(id) {
    if (confirm("Tem certeza que deseja deletar este Professor?")) {
        try {
            let response = await fetch(`http://localhost:8080/professor/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                alert("Erro do back-end: " + response.status);
                return;
            }

            alert("Professor deletado com sucesso!");
            getProfessor(); 
        } catch (error) {
            alert("Erro na requisição: " + error.message);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("professorForm").addEventListener("submit", postProfessor);
    document.getElementById("professorBusca").addEventListener("submit", (event) => {
        event.preventDefault(); 
        getProfessor(); 
    });
});
