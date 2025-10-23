package com.senai.delicias.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.senai.delicias.entities.CategoriaProduto;
import com.senai.delicias.repositories.CategoriaProdutoRepository;

@Service
public class CategoriaProdutoService {

    private final CategoriaProdutoRepository categoriaProdutoRepository;

    public CategoriaProdutoService(CategoriaProdutoRepository categoriaProdutoRepository) {
        this.categoriaProdutoRepository = categoriaProdutoRepository;
    }

    // Criar ou atualizar categoria
    public CategoriaProduto save(CategoriaProduto categoriaProduto) {
        return categoriaProdutoRepository.save(categoriaProduto);
    }

    // Buscar todas as categorias
    public List<CategoriaProduto> findAll() {
        return categoriaProdutoRepository.findAll();
    }

    // Buscar categoria por ID
    public Optional<CategoriaProduto> findById(Long id) {
        return categoriaProdutoRepository.findById(id);
    }

    // Deletar categoria por ID
    public void delete(Long id) {
        categoriaProdutoRepository.deleteById(id);
    }
}
