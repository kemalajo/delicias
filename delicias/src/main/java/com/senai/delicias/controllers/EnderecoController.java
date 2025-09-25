package com.senai.delicias.controllers;

import com.senai.delicias.entities.Endereco;
import com.senai.delicias.service.EnderecoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class EnderecoController {

    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @GetMapping
    public ResponseEntity<List<Endereco>> getAll() {
        return ResponseEntity.ok(enderecoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> getById(@PathVariable Long id) {
        return enderecoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Endereco> create(@RequestBody Endereco categoria) {
        return ResponseEntity.ok(enderecoService.save(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Endereco> update(@PathVariable Long id, @RequestBody Endereco categoria) {
        return enderecoService.findById(id)
                .map(existing -> {
                    categoria.setIdEndereco(id);
                    return ResponseEntity.ok(enderecoService.save(categoria));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        enderecoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
