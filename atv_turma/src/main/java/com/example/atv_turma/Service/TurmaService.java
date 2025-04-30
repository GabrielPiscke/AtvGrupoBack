package com.example.atv_turma.Service;

import com.example.atv_turma.Dto.AlunoDto;
import com.example.atv_turma.Dto.TurmaDto;
import com.example.atv_turma.Entity.Aluno;
import com.example.atv_turma.Entity.Turma;
import com.example.atv_turma.Repository.AlunoRepository;
import com.example.atv_turma.Repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmarepository;

    @Autowired
    private AlunoRepository alunorepository;

    public Turma fromDTO(TurmaDto turmaDto){
        Turma turma = new Turma();
        turma.setNome(turmaDto.getNome());
        turma.setSigla(turmaDto.getSigla());
        turma.setNumeroSala(turmaDto.getNumeroSala());
        turma.setProfessor(turmaDto.getProfessor());
        return turma;
    }

    public TurmaDto toDTO(Turma turma){
        TurmaDto turmaDTO = new TurmaDto();
        turmaDTO.setId(turma.getId());
        turmaDTO.setNome(turma.getNome());
        turmaDTO.setSigla(turma.getSigla());
        turmaDTO.setNumeroSala(turma.getNumeroSala());
        turmaDTO.setProfessor(turma.getProfessor());
        turmaDTO.setAlunos(turma.getAlunos());

        return turmaDTO;
    }

    public List<Turma> getAll(){
        return turmarepository.findAll();
    }

    public List<Turma> getByNome(String nome){
        return turmarepository.findAllByNome(nome);

    }

    public Optional<TurmaDto> getById(Long id){
        Optional<Turma> optionalTurma = turmarepository.findById(id);
        if(optionalTurma.isPresent()){
            return Optional.of(this.toDTO(optionalTurma.get()));
        }else {
            return Optional.empty();
        }
    }

    public TurmaDto saveDto(TurmaDto turmaDTO){
        Turma turma = this.fromDTO(turmaDTO);
        Turma turmaBd = turmarepository.save(turma);
        return this.toDTO(turmaBd);
    }

    public Optional<TurmaDto> updateTurma(Long id, TurmaDto turmaDTO){
        Optional<Turma> optionalTurma = turmarepository.findById(id);
        if(optionalTurma.isPresent()){
            Turma turma = optionalTurma.get();
            turma.setNome(turmaDTO.getNome());
            turma.setSigla(turmaDTO.getSigla());
            turma.setNumeroSala(turmaDTO.getNumeroSala());
            turma.setProfessor(turmaDTO.getProfessor());

            Turma turmaUpdate = turmarepository.save(turma);

            return Optional.of(this.toDTO(turmaUpdate));
        }else {
            return Optional.empty();
        }
    }
    public boolean addAlunoTurma (Long id, Long idAluno){
        Optional<Turma> optionalTurma = turmarepository.findById(id);
        if(!optionalTurma.isPresent()){
            return  false;
        }
        Optional<Aluno> optionalAluno = alunorepository.findById(id);
        if(!optionalAluno.isPresent()){
            return  false;
        }
        Turma turma = optionalTurma.get();
        Aluno aluno = optionalAluno.get();
        aluno.setTurma(turma);
        alunorepository.save(aluno);
        return true;
    }

    public boolean removerAlunoTurma(Long id, Long idAluno){
        // busca o aluno e verifica se ele existe
        Optional<Aluno> optionalAluno = alunorepository.findById(idAluno);
        if(!optionalAluno.isPresent()){
            return false;
        }
        // instancia as entidades Turma e Aluno
        Aluno aluno = optionalAluno.get();

        // verifica se o aluno tem uma turma
        // verifica se a turma que esta no aluno é realmente a turma que deseja remover
        if (aluno.getTurma() != null && aluno.getTurma().getId() == id) {
            aluno.setTurma(null); // remove o aluno da turma
            alunorepository.save(aluno); // salva no banco de dados
            return true;
        }
        return false;
    }


    public boolean delete(Long id){
        if(turmarepository.existsById(id)){
            turmarepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }

}
