package com.example.atv_turma.Dto;

import com.example.atv_turma.Entity.Aluno;
import com.example.atv_turma.Entity.Turma;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDto  implements Serializable {
        private long id;
        private String nome;
        @Column(unique = true)
        private String cpf;

        @JsonIgnore
        private Turma turma;

        public AlunoDto(long id, String nome, String cpf) {
                this.id = id;
                this.nome = nome;
                this.cpf = cpf;
        }
}
