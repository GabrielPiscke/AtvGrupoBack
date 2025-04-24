package com.example.atv_turma.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {
    @Autowired
    private UsuarioRepository usuariorepository;

    public Usuario fromDTO(UsuarioDto usuarioDto){
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDto.getNome());
        usuario.setSobrenome(usuarioDto.getSobrenome());
        usuario.setCpf(usuarioDto.getCpf());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setSenha(usuarioDto.getSenha());
        usuario.setUsername(usuarioDto.getUsername());
        usuario.setDataNascimento(usuarioDto.getDataNascimento());

        return usuario;
    }

    public UsuarioDto toDTO(Usuario usuario){
        UsuarioDto usuarioDTO = new UsuarioDto();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNome(usuario.getNome());
        usuarioDTO.setSobrenome(usuario.getSobrenome());
        usuarioDTO.setCpf(usuario.getCpf());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setSenha(usuario.getSenha());
        usuarioDTO.setUsername(usuario.getUsername());
        usuarioDTO.setDataNascimento(usuario.getDataNascimento());

        return usuarioDTO;
    }

    public List<Usuario> getAll(){
        return usuariorepository.findAll();
    }


    public List<Usuario> getByCpf(String cpf){
        return usuariorepository.findByCpf(cpf);
    }

    public Optional<UsuarioDto> getById(Long id){
        Optional<Usuario> optionalUsuario = usuariorepository.findById(id);
        if(optionalUsuario.isPresent()){
            return Optional.of(this.toDTO(optionalUsuario.get()));
        }else {
            return Optional.empty();
        }
    }

    public UsuarioDto saveDto(UsuarioDto usuarioDTO){
        Usuario usuario = this.fromDTO(usuarioDTO);
        Usuario usuarioBd = usuariorepository.save(usuario);
        return this.toDTO(usuarioBd);
    }

    public Optional<UsuarioDto> updateUsuario(Long id, UsuarioDto usuarioDTO){
        Optional<Usuario> optionalUsuario = usuariorepository.findById(id);
        if(optionalUsuario.isPresent()){
            Usuario usuario = optionalUsuario.get();
            usuario.setNome(usuarioDTO.getNome());
            usuario.setSobrenome(usuarioDTO.getSobrenome());
            usuario.setCpf(usuarioDTO.getCpf());
            usuario.setEmail(usuarioDTO.getEmail());
            usuario.setDataNascimento(usuarioDTO.getDataNascimento());

            Usuario usuarioUpdate = usuariorepository.save(usuario);

            return Optional.of(this.toDTO(usuarioUpdate));
        }else {
            return Optional.empty();
        }
    }
   
    public boolean delete(Long id){
        if(usuariorepository.existsById(id)){
            usuariorepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
