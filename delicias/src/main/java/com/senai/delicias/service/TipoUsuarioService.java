package com.senai.delicias.service;

import com.senai.delicias.entities.TipoUsuario;
import com.senai.delicias.repositories.TipoUsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoUsuarioService {

    private final TipoUsuarioRepository tipoUsuarioRepository;

    public TipoUsuarioService(TipoUsuarioRepository tipoUsuarioRepository) {
        this.tipoUsuarioRepository = tipoUsuarioRepository;
    }

    public List<TipoUsuario> findAll() {
        return tipoUsuarioRepository.findAll();
    }

    public Optional<TipoUsuario> findById(Long id) {
        return tipoUsuarioRepository.findById(id);
    }

    public TipoUsuario save(TipoUsuario tipoUsuario) {
        return tipoUsuarioRepository.save(tipoUsuario);
    }

    public void delete(Long id) {
        tipoUsuarioRepository.deleteById(id);
    }
}
