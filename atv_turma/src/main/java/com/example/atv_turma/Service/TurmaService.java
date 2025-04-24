package com.example.atv_turma.Service;

import com.example.atv_turma.Dto.TurmaDto;
import com.example.atv_turma.Entity.Turma;
import com.example.atv_turma.Repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmarepository;

    public Turma fromDTO(TurmaDto turmaDto){
        Turma turma = new Turma();
        turma.setNome(turmaDto.getNome());
        turma.setSobrenome(turmaDto.getSobrenome());
        turma.setCpf(turmaDto.getCpf());
        turma.setEmail(turmaDto.getEmail());
        turma.setSenha(turmaDto.getSenha());
        turma.setUsername(turmaDto.getUsername());
        turma.setDataNascimento(turmaDto.getDataNascimento());

        return turma;
    }

    public TurmaDto toDTO(Turma turma){
        TurmaDto turmaDTO = new TurmaDto();
        turmaDTO.setId(turma.getId());
        turmaDTO.setNome(turma.getNome());
        turmaDTO.setSobrenome(turma.getSobrenome());
        turmaDTO.setCpf(turma.getCpf());
        turmaDTO.setEmail(turma.getEmail());
        turmaDTO.setSenha(turma.getSenha());
        turmaDTO.setUsername(turma.getUsername());
        turmaDTO.setDataNascimento(turma.getDataNascimento());

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
            turma.setSobrenome(turmaDTO.getSobrenome());
            turma.setCpf(turmaDTO.getCpf());
            turma.setEmail(turmaDTO.getEmail());
            turma.setDataNascimento(turmaDTO.getDataNascimento());

            Turma turmaUpdate = turmarepository.save(turma);

            return Optional.of(this.toDTO(turmaUpdate));
        }else {
            return Optional.empty();
        }
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
