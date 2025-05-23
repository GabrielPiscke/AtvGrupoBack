package com.example.atv_turma.Controller;


import com.example.atv_turma.Dto.ProfessorDto;
import com.example.atv_turma.Dto.TurmaDto;
import com.example.atv_turma.Entity.Aluno;
import com.example.atv_turma.Entity.Turma;
import com.example.atv_turma.Service.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turma")
public class TurmaController {

    @Autowired
    TurmaService turmaService;

    @GetMapping
    public List<Turma> getAll(@RequestParam(required = false)String nome) {
        if (nome != null && !nome.isEmpty()) {
            return turmaService.getByNome(nome);
        }
        return turmaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurmaDto> getById(@PathVariable Long id){
        Optional<TurmaDto> turmaDtoOptional = turmaService.getById(id);
        if(turmaDtoOptional.isPresent()){
            return ResponseEntity.ok(turmaDtoOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TurmaDto> create(@RequestBody TurmaDto turmaDto){
        TurmaDto turmmaDTOSave  = turmaService.saveDto(turmaDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(turmmaDTOSave);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TurmaDto> update(@PathVariable Long id, @RequestBody TurmaDto turmaDto){
        Optional<TurmaDto> turmaDtoOptional = turmaService.updateTurma(id, turmaDto);
        if(turmaDtoOptional.isPresent()){
            return ResponseEntity.ok(turmaDtoOptional.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    // adicionar o aluno a turma
    @PutMapping("/{id}/aluno-add/{idAluno}")
    public ResponseEntity<String> addAlunoTurma(@PathVariable Long id, @PathVariable Long idAluno){
        if(turmaService.addAlunoTurma(id, idAluno)){ // verifica se deu certo adicionar o aluno na turma
            return ResponseEntity.ok("Aluno adicionado com sucesso");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno ou Professor não encontrado");
        }
    }
    @PutMapping("/{id}/aluno-remove/{idAluno}")
    public ResponseEntity<String> removerAlunoTurma(@PathVariable Long id, @PathVariable Long idAluno){
        if(turmaService.removerAlunoTurma(id, idAluno)){
            return ResponseEntity.ok("Aluno removido da turma com sucesso");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao remover aluno da turma");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(turmaService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
