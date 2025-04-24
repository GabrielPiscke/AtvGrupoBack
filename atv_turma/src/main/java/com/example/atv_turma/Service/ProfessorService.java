package com.example.atv_turma.Service;

import com.example.atv_turma.Dto.ProfessorDto;
import com.example.atv_turma.Entity.Professor;
import com.example.atv_turma.Repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {
    @Autowired
    private ProfessorRepository professorrepository;

    public Professor fromDTO(ProfessorDto professorDto){
        Professor professor = new Professor();
        professor.setNome(professorDto.getNome());
        professor.setSobrenome(professorDto.getSobrenome());

        return professor;
    }

    public ProfessorDto toDTO(Professor professor){
        ProfessorDto professorDTO = new ProfessorDto();
        professorDTO.setId(professor.getId());
        professorDTO.setNome(professor.getNome());
        professorDTO.setSobrenome(professor.getSobrenome());

        return professorDTO;
    }

    public List<Professor> getAll(){
        return professorrepository.findAll();
    }

    public List<Professor> getByNome(String nome){
        return professorrepository.findAllByNome(nome);

    }

    public Optional<ProfessorDto> getById(Long id){
        Optional<Professor> optionalProfessor = professorrepository.findById(id);
        if(optionalProfessor.isPresent()){
            return Optional.of(this.toDTO(optionalProfessor.get()));
        }else {
            return Optional.empty();
        }
    }

    public ProfessorDto saveDto(ProfessorDto professorDTO){
        Professor professor = this.fromDTO(professorDTO);
        Professor professorBd = professorrepository.save(professor);
        return this.toDTO(professorBd);
    }

    public Optional<ProfessorDto> updateProfessor(Long id, ProfessorDto professorDTO){
        Optional<Professor> optionalProfessor = professorrepository.findById(id);
        if(optionalProfessor.isPresent()){
            Professor professor = optionalProfessor.get();
            professor.setNome(professorDTO.getNome());
            professor.setSobrenome(professorDTO.getSobrenome());

            Professor professorUpdate = professorrepository.save(professor);

            return Optional.of(this.toDTO(professorUpdate));
        }else {
            return Optional.empty();
        }
    }

    public boolean delete(Long id){
        if(professorrepository.existsById(id)){
            professorrepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
