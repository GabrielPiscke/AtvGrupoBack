package com.example.atv_turma.Controller;


import com.example.atv_turma.Dto.ProfessorDto;
import com.example.atv_turma.Entity.Aluno;
import com.example.atv_turma.Entity.Professor;
import com.example.atv_turma.Service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public List<Aluno> getAll(@RequestParam(required = false)String nome)
    {
        if (nome != null && !nome.isEmpty()) {
            return professorService.getByNome(nome);
        }

        return professorService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDto> getById(@PathVariable Long id){
        Optional<ProfessorDto> professorDtoOptional = professorService.getById(id);
        if(professorDtoOptional.isPresent()){
            return ResponseEntity.ok(professorDtoOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProfessorDto> create(@RequestBody ProfessorDto professorDto){
        ProfessorDto professorDtoSave  = professorService.create(professorDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(professorDtoSave);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDto> update(@PathVariable Long id, @RequestBody ProfessorDto professorDto){
        Optional<ProfessorDto> professorDtoOptional = professorService.up(id, professorDto);
        if(professorDtoOptional.isPresent()){
            return ResponseEntity.ok(professorDtoOptional.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(professorService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }




}
