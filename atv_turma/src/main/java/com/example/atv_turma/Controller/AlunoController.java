package com.example.atv_turma.Controller;

import com.example.atv_turma.Dto.AlunoDto;
import com.example.atv_turma.Entity.Aluno;
import com.example.atv_turma.Service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public List<Aluno> getAll(@RequestParam(required = false)String cpf)
    {
         if (cpf != null && !cpf.isEmpty()) {
            return alunoService.getByCpf(cpf);
        }
        return alunoService.getAll();
    }



    @GetMapping("/{id}")
    public ResponseEntity<AlunoDto> getById(@PathVariable Long id){
        Optional<AlunoDto> alunoDtoOptional = alunoService.getById(id);
        if(alunoDtoOptional.isPresent()){
            return ResponseEntity.ok(alunoDtoOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AlunoDto> create(@RequestBody AlunoDto alunoDto){
        AlunoDto alunoDto1 = alunoService.saveDto(alunoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoDto1);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDto> update(@PathVariable Long id, @RequestBody AlunoDto alunoDto){
        Optional<AlunoDto> alunoDtoOptional = alunoService.updateAluno(id, alunoDto);
        if(alunoDtoOptional.isPresent()){
            return ResponseEntity.ok(alunoDtoOptional.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(alunoService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }





}
