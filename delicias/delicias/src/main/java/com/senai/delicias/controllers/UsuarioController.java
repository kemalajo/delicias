package com.senai.delicias.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.delicias.entities.Usuario;
import com.senai.delicias.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	//Vai cadastrar um novo usuário (POST)
	@PostMapping
	public Usuario createUsuario(@RequestBody Usuario usuario) {
		return usuarioService.saveUsuario(usuario);
	}
	
	//Vai retornar um usuário específico peloID (GET)
	@GetMapping
	public List<Usuario> getAllUsuario() {
		return usuarioService.getAllUsuario();
	}

	//Atualiza os dados de um usuário (PUT)
	@GetMapping("/{id}")
	public Usuario getUsuario(@PathVariable Long id) {
		return usuarioService.getUsuarioById(id);
	}
	
	//Atualiza os dados de um usuário (PUT)
	@PutMapping
	public Usuario editUsuario(@RequestBody Usuario usuario) {
		return usuarioService.saveUsuario(usuario);
	}

	//Vai excluir um usuário pelo ID (DELETE)
	@DeleteMapping("/{id}")
	public void deleteUsuario(@PathVariable Long id) {
		usuarioService.deleteUsuario(id);
	}

	//Realiza o login de usuário (POST
	@PostMapping("/login")
	public Usuario login(@RequestBody Usuario loginRequest) {
		Usuario usuario = usuarioService.autenticarPessoa(loginRequest.getNomeUsuario(), loginRequest.getSenha());

		if (usuario != null) {
			return usuario;
		} else {
			return null;
		}
	}

}