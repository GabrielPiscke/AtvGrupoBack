package com.example.atv_turma.Dto;

import com.example.atv_turma.Entity.Professor;
import com.example.atv_turma.Entity.Turma;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorDto implements Serializable {
    private long id;
    private String nome;
    private String sobrenome;

}
