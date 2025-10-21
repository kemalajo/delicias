package com.senai.delicias.controllers;

import com.senai.delicias.entities.TipoProduto;
import com.senai.delicias.service.TipoProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipoProduto")
public class TipoProdutoController {

    private final TipoProdutoService tipoProdutoService;

    public TipoProdutoController(TipoProdutoService tipoProdutoService) {
        this.tipoProdutoService = tipoProdutoService;
    }

    @GetMapping
    public ResponseEntity<List<TipoProduto>> getAllProdutos() {
        return ResponseEntity.ok(tipoProdutoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoProduto> getProdutoById(@PathVariable Long id) {
        return tipoProdutoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TipoProduto> createProduto(@RequestBody TipoProduto tipoProduto) {
        return ResponseEntity.ok(tipoProdutoService.save(tipoProduto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoProduto> updateProduto(@PathVariable Long id, @RequestBody TipoProduto tipoProduto) {
        return tipoProdutoService.findById(id)
                .map(existing -> {
                	tipoProduto.setIdTipoProduto(id);
                    return ResponseEntity.ok(tipoProdutoService.save(tipoProduto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
    	tipoProdutoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
