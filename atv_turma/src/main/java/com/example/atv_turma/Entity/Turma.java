package com.example.atv_turma.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private Professor professor;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL)
<<<<<<< HEAD

=======
>>>>>>> d05963e301a7db7ab3d55bf45625b2a79840ab0b
    private List<Aluno> alunos;

    public Turma(Long id, String sigla, String nome, int numeroSala){
        this.id = id;
        this.sigla = sigla;
        this.nome = nome;
        this.numeroSala = numeroSala;
    }
}
