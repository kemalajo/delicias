package com.senai.delicias.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.delicias.entities.Usuario;
import com.senai.delicias.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	public Usuario saveUsuario(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public List<Usuario> getAllUsuario() {
		return usuarioRepository.findAll();
	}

	public Usuario getUsuarioById(Long id) {
		return usuarioRepository.findById(id).orElse(null);
	}

	public void deleteUsuario(Long id) {
		usuarioRepository.deleteById(id);
	}

	public Usuario autenticarPessoa(String nomeUsuario, String senha) {

		//
		Usuario usuario = usuarioRepository.findByNomeUsuario(nomeUsuario);

		if (usuario != null && usuario.getSenha().equals(senha)) {
			return usuario;
		} else {

			return null;
		}
	}
}