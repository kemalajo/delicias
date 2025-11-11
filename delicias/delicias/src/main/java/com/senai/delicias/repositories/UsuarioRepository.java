package com.senai.delicias.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.delicias.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	//Busca um usuário pelo nome de usuário
	Usuario findByNomeUsuario(String nomeUsuario);
	
	//Busca o usuário pela senha
	Usuario findBySenha(String senha);
}