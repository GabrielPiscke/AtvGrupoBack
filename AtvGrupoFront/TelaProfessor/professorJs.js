
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
    let colunas = document.getElementById("colunas");
        let lista = document.getElementById("listaProfessores");
        lista.innerHTML = "";
        colunas.innerHTML = "";
            
        //colunas
            let idColun = document.createElement("th");
            idColun.scope = "col";
            idColun.textContent = "Id";

            let nomeColun = document.createElement("th");
            nomeColun.scope = "col";
            nomeColun.textContent = "Nome";

            let sobrenomeColun = document.createElement("th");
            sobrenomeColun.scope = "col";
            sobrenomeColun.textContent = "Sobrenome";

            let acoesColun = document.createElement("th");
            acoesColun.scope = "col";
            acoesColun.textContent = "Ações";

            colunas.appendChild(idColun);
            colunas.appendChild(nomeColun);
            colunas.appendChild(sobrenomeColun);
            colunas.appendChild(acoesColun);

        //linhas
        data.forEach(professor => {
             
            let linha = document.createElement("tr");
        
        // Colunas: ID, Nome, CPF
            let id = document.createElement("th");
            id.scope = "row"; // Acessibilidade
            id.textContent = professor.id;
        
            let nome = document.createElement("td");
            nome.textContent = professor.nome;
        
            let sobrenome = document.createElement("td");
            sobrenome.textContent = professor.sobrenome;
        
            linha.appendChild(id);
            linha.appendChild(nome);
            linha.appendChild(sobrenome);
        
        // Botão Editar
            let tdEditar = document.createElement("td"); // célula para o botão
            let btnEditar = document.createElement("button");
              
            btnEditar.classList.add("btn", "btn-warning", "btn-sm", "me-2");
            btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
            btnEditar.onclick = function () {
                window.open(`professorEdit.html?id=${professor.id}`, "_blank");
            };
            tdEditar.appendChild(btnEditar);
        
        // Botão Deletar
            let btnDeletar = document.createElement("button");
            btnDeletar.classList.add("btn", "btn-outline-danger", "btn-sm");
            btnDeletar.innerHTML = `<i class="bi bi-trash"></i> Deletar`;
            btnDeletar.onclick = function () {
                deletarProfessor(professor.id);
            };
            tdEditar.appendChild(btnDeletar);
        
            linha.appendChild(tdEditar);
        
        // Adiciona a linha completa à tabela
            lista.appendChild(linha);
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
