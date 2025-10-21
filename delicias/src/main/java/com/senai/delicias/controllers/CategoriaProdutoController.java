package com.senai.delicias.controllers;

import com.senai.delicias.entities.CategoriaProduto;
import com.senai.delicias.service.CategoriaProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoriaProduto")
public class CategoriaProdutoController {

    private final CategoriaProdutoService categoriaProdutoService;

    public CategoriaProdutoController(CategoriaProdutoService categoriaProdutoService) {
        this.categoriaProdutoService = categoriaProdutoService;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaProduto>> getAllCategorias() {
        return ResponseEntity.ok(categoriaProdutoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaProduto> getCategoriaById(@PathVariable Long id) {
        return categoriaProdutoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CategoriaProduto> createCategoria(@RequestBody CategoriaProduto categoria) {
        return ResponseEntity.ok(categoriaProdutoService.save(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaProduto> updateCategoria(@PathVariable Long id, @RequestBody CategoriaProduto categoria) {
        return categoriaProdutoService.findById(id)
                .map(existing -> {
                    categoria.setIdCategoria(id); 
                    return ResponseEntity.ok(categoriaProdutoService.save(categoria));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        categoriaProdutoService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    
}
