package com.example.atv_turma.Dto;

import com.example.atv_turma.Entity.Professor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorDto implements Serializable {
    private long id;
    private String nome;
    private String sobrenome;



}
