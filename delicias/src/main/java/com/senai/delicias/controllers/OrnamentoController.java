package com.senai.delicias.controllers;

import com.senai.delicias.entities.Ornamento;
import com.senai.delicias.service.OrnamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ornamento")
public class OrnamentoController {

    private final OrnamentoService ornamentoService;

    public OrnamentoController(OrnamentoService ornamentoService) {
        this.ornamentoService = ornamentoService;
    }

    @GetMapping
    public ResponseEntity<List<Ornamento>> getAll() {
        return ResponseEntity.ok(ornamentoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ornamento> getById(@PathVariable Long id) {
        return ornamentoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ornamento> create(@RequestBody Ornamento ornamento) {
        return ResponseEntity.ok(ornamentoService.save(ornamento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ornamento> update(@PathVariable Long id, @RequestBody Ornamento ornamento) {
        return ornamentoService.findById(id)
                .map(existing -> {
                	ornamento.setIdOrnamento(id);
                    return ResponseEntity.ok(ornamentoService.save(ornamento));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ornamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
