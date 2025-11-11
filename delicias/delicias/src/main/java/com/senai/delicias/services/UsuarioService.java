package com.senai.delicias.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.delicias.entities.Usuario;
import com.senai.delicias.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	//Injeta o repositório para acesso ao banco de dados
	@Autowired
	private UsuarioRepository usuarioRepository;

	//Salva ou atualiza um usuário
	public Usuario saveUsuario(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	//Retorna todos os usuários cadastrados
	public List<Usuario> getAllUsuario() {
		return usuarioRepository.findAll();
	}

	//Exclui um usuário pelo ID
	public Usuario getUsuarioById(Long id) {
		return usuarioRepository.findById(id).orElse(null);
	}

	//Autentica um usuário pelo nome e senha 
	public void deleteUsuario(Long id) {
		usuarioRepository.deleteById(id);
	}

	//Busca usuário pelo nome
	public Usuario autenticarPessoa(String nomeUsuario, String senha) {

		//Busca usuário pelo nome
		Usuario usuario = usuarioRepository.findByNomeUsuario(nomeUsuario);

		//Verifica se a senha informada é igual à armazenada
		if (usuario != null && usuario.getSenha().equals(senha)) {
			return usuario;
		} else {

			return null; 
		}
	}
}