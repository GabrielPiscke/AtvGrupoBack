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
public class Professor implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String sobrenome;

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL)

    @JsonIgnore
    private List<Turma> turmas;

    public Professor(Long id, String nome, String sobrenome){
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
    }

}
