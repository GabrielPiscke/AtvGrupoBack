package com.example.atv_turma.Repository;

import com.example.atv_turma.Entity.Professor;
import com.example.atv_turma.Entity.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    List<Turma> findAllByNome (String nome);
}
