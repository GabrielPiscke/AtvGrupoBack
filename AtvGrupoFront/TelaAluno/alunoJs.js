

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
        function criarListaDeAlunos(data) {
            let lista = document.getElementById("listaAlunos");
            lista.innerHTML = "";
            
            data.forEach(aluno => {
                let linha = document.createElement("tr");
        
                // Colunas: ID, Nome, CPF
                let id = document.createElement("th");
                id.scope = "row"; // Acessibilidade
                id.textContent = aluno.id;
        
                let nome = document.createElement("td");
                nome.textContent = aluno.nome;
        
                let cpf = document.createElement("td");
                cpf.textContent = aluno.cpf;
        
                linha.appendChild(id);
                linha.appendChild(nome);
                linha.appendChild(cpf);
        
                // Botão Editar
                let tdEditar = document.createElement("td"); // célula para o botão
                let btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                
                btnEditar.classList.add("btn", "btn-warning", "btn-sm", "me-2");
                btnEditar.onclick = function () {
                    window.open(`alunoEdit.html?id=${aluno.id}`, "_blank");
                };
                tdEditar.appendChild(btnEditar);
        
                // Botão Deletar
                let btnDeletar = document.createElement("button");
                btnDeletar.textContent = "Deletar";
                btnDeletar.classList.add("btn", "btn-danger", "btn-sm");
                btnDeletar.onclick = function () {
                    deletarAluno(aluno.id);
                };
                tdEditar.appendChild(btnDeletar);
        
                linha.appendChild(tdEditar);
        
                // Adiciona a linha completa à tabela
                lista.appendChild(linha);
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