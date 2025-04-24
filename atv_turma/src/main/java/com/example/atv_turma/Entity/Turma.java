package com.example.atv_turma.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Turma implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String sigla;
    private int numeroSala;
    private String nome;

    @ManyToOne
    @JoinColumn(name = "id_professor", referencedColumnName = "id")
    private Professor professor;


    private List<Aluno> alunos;
}
