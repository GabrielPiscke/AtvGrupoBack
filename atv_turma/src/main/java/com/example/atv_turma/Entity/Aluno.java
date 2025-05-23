package com.example.atv_turma.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Aluno implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    @Column(unique = true)
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "id_turma", referencedColumnName = "id")

    @JsonIgnore
    private Turma turma;

    public Aluno(Long id, String nome, String cpf){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
    }
}
