package com.senai.delicias.service;

import com.senai.delicias.entities.TipoProduto;
import com.senai.delicias.repositories.TipoProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoProdutoService {

    private final TipoProdutoRepository tipoProdutoRepository;

    public TipoProdutoService(TipoProdutoRepository tipoProdutoRepository) {
        this.tipoProdutoRepository = tipoProdutoRepository;
    }

    public List<TipoProduto> findAll() {
        return tipoProdutoRepository.findAll();
    }

    public Optional<TipoProduto> findById(Long id) {
        return tipoProdutoRepository.findById(id);
    }

    public TipoProduto save(TipoProduto produto) {
        return tipoProdutoRepository.save(produto);
    }

    public void delete(Long id) {
        tipoProdutoRepository.deleteById(id);
    }
}
