
// ## Funções para enviar Professor(POST) com os dados do formulario
function criarObjetoParaEnviar(){
    let formData = {
    
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
    };

    return formData
}
//Post - cadastro do professor
async function postProfessor(event) {
    event.preventDefault();
    
    let formData = criarObjetoParaEnviar();
    
    try {
        let response = await fetch("http://localhost:8080/professor", {
        method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status);
            return;
        }

        let data = await response.json();

        alert("Sucesso: " + JSON.stringify(data));
        getPro();
    } catch (error) {
        alert("Erro na requisição: " + error.message);
        
    }
}

// Lista de professores
function criarListaDeProfessores(data){
    let lista = document.getElementById("listaProfessores");
    lista.innerHTML = "";

    data.forEach(professor => {
        let item = document.createElement("li");
        item.textContent = `ID: ${professor.id} - Nome: ${professor.nome} - Sobrenome: ${professor.sobrenome}`;
        
        // botão de editar
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.target = "_blank";
        btnEditar.style.marginLeft = "10px";
        btnEditar.onclick = function() {
            window.open(`professorEdit.html?id=${professor.id}`, '_blank');
        };
        item.appendChild(btnEditar);//para editar o professor

        // botão de deletar
        let btnDeletar = document.createElement("button")
        btnDeletar.textContent = "Deletar";
        btnDeletar.style.marginLeft = "10px";
        btnDeletar.onclick = function(){
            deletarProfessor(professor.id)
        }
        item.appendChild(btnDeletar);

        lista.appendChild(item);
    });
}
//get - busca todos os professores
async function getProfessor() {

    try {
        let response = await fetch("http://localhost:8080/professor?nome=$`{nome}", {
        method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()
        criarListaDeClientes(data)
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}
// nao sei se via presisar
// GET - Buscar professor por ID
//async function buscarProfessorPorId() {
  //  let id = document.getElementById("buscarId").value;

    //if (!id) {
      //  alert("Informe um ID");
       // return;
  //  }

    //try {
      //  let response = await fetch(`http://localhost:8080/professor/${id}`, {
        //    method: "GET",
          //  headers: { "Content-Type": "application/json" },
        //});

        //if (!response.ok) {
          //  alert("Professor não encontrado. Código: " + response.status);
           // return;
        //}

        //let professor = await response.json();
        //criarListaDeProfessores([professor]); // Coloca em array para reutilizar função
   // } catch (error) {
     //   alert("Erro na requisição: " + error.message);
    //}
//}

// GET - Buscar professor por nome
async function buscarProfessorPorNome() {
    let nome = document.getElementById("buscarNome").value;

    if (!nome) {
        alert("Informe um nome");
        return;
    }

    try {
        let response = await fetch(`http://localhost:8080/professor/nome/${buscarNome}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            alert("Professor não encontrado. Código: " + response.status);
            return;
        }

        let data = await response.json();
        criarListaDeProfessores(data);
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
}
// o buscar por id e o busacar por nome 

// deletar Professor (DELETE)
async function deletarCliente(id) {}
    if (!confirm("Tem certeza que deseja deletar este Professor?")) return;

        try {
            let response = await fetch(`http://localhost:8080/professor/${id}`, {
            method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if(!response.ok){
                alert("Erro do back-end" + response.status)
                return
            }
            alert("Professor deletado com sucesso!");
            getProfessor();
        } catch (error) {
            alert("Erro na requisição: " + error.message)
        }
// ordem dos eventos
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("professorForm").addEventListener("submit", postProfessor);
    document.getElementById("carregarProfessores").addEventListener("click", getProfessor);
});
