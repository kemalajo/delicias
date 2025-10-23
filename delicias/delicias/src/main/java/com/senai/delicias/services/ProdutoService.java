package com.senai.delicias.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.senai.delicias.entities.Produto;
import com.senai.delicias.repositories.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    // Criar ou atualizar produto
    public Produto save(Produto produto) {
        return produtoRepository.save(produto);
    }

    // Buscar todos os produtos
    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    // Buscar produto por ID
    public Optional<Produto> findById(Long id) {
        return produtoRepository.findById(id);
    }

    // Deletar produto por ID
    public void delete(Long id) {
        produtoRepository.deleteById(id);
    }
}
