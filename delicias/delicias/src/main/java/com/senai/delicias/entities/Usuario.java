package com.senai.delicias.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

	@Entity
	@Table(name = "tb_usuario")
	public class Usuario {
		// Atributos
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "id_usuario", nullable = false)
		private Long idUsuario;

		//Nome de usuário (é um campo obrigatório)
		@Column(name = "nome_usuario", nullable = false)
		private String nomeUsuario;

		@Column(name = "senha")
		private String senha;


		// Construtores
		public Usuario() {

		}
		
		//Construtor com parâmetros
		public Usuario(Long idUsuario, String nomeUsuario, String senha) {
			this.idUsuario = idUsuario;
			this.nomeUsuario = nomeUsuario;
			this.senha = senha;
		}
		
		//Métodos getters e setters
		public Long getIdUsuario() {
			return idUsuario;
		}

		public void setIdUsuario(Long idUsuario) {
			this.idUsuario = idUsuario;
		}

		public String getNomeUsuario() {
			return nomeUsuario;
		}

		public void setNomeUsuario(String nomeUsuario) {
			this.nomeUsuario = nomeUsuario;
		}

		public String getSenha() {
			return senha;
		}

		public void setSenha(String senha) {
			this.senha = senha;
		}
		
	
	}