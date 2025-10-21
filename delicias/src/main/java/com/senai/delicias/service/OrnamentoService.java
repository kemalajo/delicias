package com.senai.delicias.service;

import com.senai.delicias.entities.Ornamento;
import com.senai.delicias.repositories.OrnamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrnamentoService {

    private final OrnamentoRepository ornamentoRepository;

    public OrnamentoService(OrnamentoRepository ornamentoRepository) {
        this.ornamentoRepository = ornamentoRepository;
    }

    public List<Ornamento> findAll() {
        return ornamentoRepository.findAll();
    }

    public Optional<Ornamento> findById(Long id) {
        return ornamentoRepository.findById(id);
    }

    public Ornamento save(Ornamento endereco) {
        return ornamentoRepository.save(endereco);
    }

    public void delete(Long id) {
    	ornamentoRepository.deleteById(id);
    }
}
