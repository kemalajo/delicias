package com.senai.delicias.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.senai.delicias.entities.Avaliacao;
import com.senai.delicias.services.AvaliacaoService;

import java.util.List;


@RestController
@RequestMapping("/avaliacoes")
@CrossOrigin(origins = "*") // permite chamadas do frontend
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    // Listar todas as avaliações
    @GetMapping
    public List<Avaliacao> listarTodas() {
        return avaliacaoService.listarTodas();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Avaliacao buscarPorId(@PathVariable Long id) {
        return avaliacaoService.buscarPorId(id);
    }

    // Criar nova avaliação
    @PostMapping
    public Avaliacao criarAvaliacao(@RequestBody Avaliacao avaliacao) {
        return avaliacaoService.salvar(avaliacao);
    }

    // Deletar uma avaliação
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        avaliacaoService.deletar(id);
    }
}
