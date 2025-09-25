package com.senai.delicias.service;

import com.senai.delicias.entities.CategoriaProduto;
import com.senai.delicias.repositories.CategoriaProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaProdutoService {

    private final CategoriaProdutoRepository categoriaProdutoRepository;

    public CategoriaProdutoService(CategoriaProdutoRepository CategoriaProdutoRepository) {
        this.categoriaProdutoRepository = CategoriaProdutoRepository;
    }

    public List<CategoriaProduto> findAll() {
        return categoriaProdutoRepository.findAll();
    }

    public Optional<CategoriaProduto> findById(Long id) {
        return categoriaProdutoRepository.findById(id);
    }

    public CategoriaProduto save(CategoriaProduto CategoriaProduto) {
        return categoriaProdutoRepository.save(CategoriaProduto);
    }

    public void delete(Long id) {
    	categoriaProdutoRepository.deleteById(id);
    }
}
