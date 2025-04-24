package com.example.atv_turma.Service;

import com.example.atv_turma.Entity.Aluno;
import com.example.atv_turma.Dto.AlunoDto;
import com.example.atv_turma.Repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunorepository;

    public Aluno fromDTO(AlunoDto alunoDto){
        Aluno aluno = new Aluno();
        aluno.setNome(alunoDto.getNome());
        aluno.setCpf(alunoDto.getCpf());
        return aluno;
    }

    public AlunoDto toDTO(Aluno aluno){
        AlunoDto alunoDTO = new AlunoDto();
        alunoDTO.setId(aluno.getId());
        alunoDTO.setNome(aluno.getNome());
        alunoDTO.setCpf(aluno.getCpf());
        return alunoDTO;
    }

    public List<Aluno> getAll(){
        return alunorepository.findAll();
    }


    public List<Aluno> getByCpf(String cpf){
        return alunorepository.findByCpf(cpf);
    }

    public Optional<AlunoDto> getById(Long id){
        Optional<Aluno> optionalAluno = alunorepository.findById(id);
        if(optionalAluno.isPresent()){
            return Optional.of(this.toDTO(optionalAluno.get()));
        }else {
            return Optional.empty();
        }
    }

    public AlunoDto saveDto(AlunoDto alunoDTO){
        Aluno aluno = this.fromDTO(alunoDTO);
        Aluno alunoBd = alunorepository.save(aluno);
        return this.toDTO(alunoBd);
    }

    public Optional<AlunoDto> updateAluno(Long id, AlunoDto alunoDTO){
        Optional<Aluno> optionalAluno = alunorepository.findById(id);
        if(optionalAluno.isPresent()){
            Aluno aluno = optionalAluno.get();
            aluno.setNome(alunoDTO.getNome());
            aluno.setCpf(alunoDTO.getCpf());

            Aluno alunoUpdate = alunorepository.save(aluno);

            return Optional.of(this.toDTO(alunoUpdate));
        }else {
            return Optional.empty();
        }
    }

    public boolean delete(Long id){
        if(alunorepository.existsById(id)){
            alunorepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
