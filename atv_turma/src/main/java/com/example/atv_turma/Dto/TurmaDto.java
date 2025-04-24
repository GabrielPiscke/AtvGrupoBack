package com.example.atv_turma.Dto;

import com.example.atv_turma.Entity.Aluno;
import com.example.atv_turma.Entity.Turma;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurmaDto implements Serializable {
        private long id;
        private String sigla;
        private int numeroSala;
        private String nome;

        private List<Aluno> alunos;

        public Turma toTurma(){
            return new Turma(
                    this.id,
                    this.
                    this.,


            );
        }

        public EmprestimoDTO fromEmprestimo(Emprestimo emprestimo){
            return new EmprestimoDTO(
                    emprestimo.getId(),
                    emprestimo.getDataInicial(),
                    emprestimo.getDataFinal(),
                    emprestimo.getCliente(),
                    emprestimo.getLivros()
            );
        }
}
