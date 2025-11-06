package com.senai.delicias.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.delicias.entities.Avaliacao;
import com.senai.delicias.repositories.AvaliacaoRepository;

import java.util.List;


@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    // Listar todas as avaliações
    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAll();
    }

    // Buscar uma avaliação pelo ID
    public Avaliacao buscarPorId(Long id) {
        return avaliacaoRepository.findById(id).orElse(null);
    }

    // Criar ou salvar uma nova avaliação
    public Avaliacao salvar(Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }

    // Deletar uma avaliação
    public void deletar(Long id) {
        avaliacaoRepository.deleteById(id);
    }
}
