

        // ##### Funções para o Envio(POST)
        // extrai os dados do form e cria um objeto para ser enviado
        // seguindo a estrutura do JSON
        function criarObjetoParaEnviar(){
            let formData = {
                nome: document.getElementById("nome").value,
                cpf: document.getElementById("cpf").value
            };

            return formData;
        }

        async function postAluno(event) {
            event.preventDefault();
            
            let formData = criarObjetoParaEnviar();
            
            try {
                let response = await fetch("http://localhost:8080/aluno", {
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
            } catch (error) {
                alert("Erro na requisição: " + error.message)
                
            }
        }

        // ##### Funções para o carregar dados da tela(GET)
        function criarListaDeAlunos(data){
            let lista = document.getElementById("listaAlunos");
            lista.innerHTML = "";
            data.forEach(aluno => {
                let item = document.createElement("li");
                item.textContent = `ID: ${aluno.id} - Nome: ${aluno.nome} - Cpf: ${aluno.cpf}`;
                
                // botão de editar
                let btnLink = document.createElement("button");
                btnLink.textContent = "Editar";
                btnLink.target = "_blank";
                btnLink.style.marginLeft = "10px";
                btnLink.onclick = function() {
                    window.open(`livroEdit.html?id=${aluno.id}`, '_blank');
                };
                item.appendChild(btnLink);

                // botão de deletar
                let btnDeletar = document.createElement("button")
                btnDeletar.textContent = "Deletar";
                btnDeletar.style.marginLeft = "10px";
                btnDeletar.onclick = function(){
                    deletarAluno(aluno.id)
                }
                item.appendChild(btnDeletar);

                lista.appendChild(item);
            });
        }

        async function getAlunos(event) {
            event.preventDefault()

            let cpfBusca = document.getElementById("cpfBusca").value; // acrecentando filtro de nome a busca, caso necessário

            try {
                let response = await fetch(`http://localhost:8080/aluno?cpf=${cpfBusca}`, {
                method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
    
                if(!response.ok){
                    alert("Erro do back-end" + response.status)
                    return
                }
    
                let data = await response.json()

                criarListaDeAlunos(data);
            } catch (error) {
                alert("Erro na requisição: " + error.message)
            }
        }

        // ##### Funções para o deletar(DELETE)
        async function deletarAluno(id) {
            if (confirm("Tem certeza que deseja remover este aluno?")) {
                try {
                    let response = await fetch(`http://localhost:8080/aluno/${id}`, {
                    method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });
        
                    if(!response.ok){
                        alert("Erro do back-end" + response.status)
                        return
                    }
                    alert("Aluno deletado com sucesso!");
                    getAlunos();
                } catch (error) {
                    alert("Erro na requisição: " + error.message)
                }
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("alunoForm").addEventListener("submit", postAluno);
            document.getElementById("alunoBusca").addEventListener("submit", getAlunos);
        });