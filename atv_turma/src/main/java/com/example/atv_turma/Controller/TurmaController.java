package com.example.atv_turma.Controller;


import com.example.atv_turma.Dto.ProfessorDto;
import com.example.atv_turma.Dto.TurmaDto;
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
    public List<Turma> getAll(@RequestParam(required = false)String nome)
    {
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(turmaService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }


}
