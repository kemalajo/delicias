package com.senai.delicias.controllers;

import com.senai.delicias.entities.TipoUsuario;
import com.senai.delicias.service.TipoUsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipos-usuario")
public class TipoUsuarioController {

    private final TipoUsuarioService tipoUsuarioService;

    public TipoUsuarioController(TipoUsuarioService tipoUsuarioService) {
        this.tipoUsuarioService = tipoUsuarioService;
    }

    @GetMapping
    public ResponseEntity<List<TipoUsuario>> getAll() {
        return ResponseEntity.ok(tipoUsuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoUsuario> getById(@PathVariable Long id) {
        return tipoUsuarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TipoUsuario> create(@RequestBody TipoUsuario tipoUsuario) {
        return ResponseEntity.ok(tipoUsuarioService.save(tipoUsuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoUsuario> update(@PathVariable Long id, @RequestBody TipoUsuario tipoUsuario) {
        return tipoUsuarioService.findById(id)
                .map(existing -> {
                    tipoUsuario.setIdTipoUsuario(id);
                    return ResponseEntity.ok(tipoUsuarioService.save(tipoUsuario));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tipoUsuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
