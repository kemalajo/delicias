package com.senai.delicias.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.senai.delicias.entities.CategoriaProduto;
import com.senai.delicias.services.CategoriaProdutoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categorias")
public class CategoriaProdutoController {

    private final CategoriaProdutoService categoriaProdutoService;

    public CategoriaProdutoController(CategoriaProdutoService categoriaProdutoService) {
        this.categoriaProdutoService = categoriaProdutoService;
    }

    // Buscar todas as categorias
    @GetMapping
    public ResponseEntity<List<CategoriaProduto>> getAllCategorias() {
        List<CategoriaProduto> categorias = categoriaProdutoService.findAll();
        return ResponseEntity.ok(categorias);
    }

    // Buscar categoria por ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaProduto> getCategoriaById(@PathVariable Long id) {
        Optional<CategoriaProduto> categoria = categoriaProdutoService.findById(id);
        return categoria.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    // Criar nova categoria
    @PostMapping
    public ResponseEntity<CategoriaProduto> createCategoria(@RequestBody CategoriaProduto categoria) {
        CategoriaProduto novaCategoria = categoriaProdutoService.save(categoria);
        return ResponseEntity.ok(novaCategoria);
    }

    // Atualizar categoria existente
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaProduto> updateCategoria(@PathVariable Long id, @RequestBody CategoriaProduto categoriaAtualizada) {
        Optional<CategoriaProduto> existente = categoriaProdutoService.findById(id);

        if (existente.isPresent()) {
            categoriaAtualizada.setIdCategoria(id);
            CategoriaProduto categoriaSalva = categoriaProdutoService.save(categoriaAtualizada);
            return ResponseEntity.ok(categoriaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar categoria por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        Optional<CategoriaProduto> existente = categoriaProdutoService.findById(id);

        if (existente.isPresent()) {
            categoriaProdutoService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
