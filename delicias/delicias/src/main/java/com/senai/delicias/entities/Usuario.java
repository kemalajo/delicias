package com.senai.delicias.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

	@Entity
	@Table(name = "tbUsuario")
	public class Usuario {
		// Atributos
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "idUsuario", nullable = false)
		private Long idUsuario;

		@Column(name = "nomeUsuario", nullable = false, length = 100)
		private String nomeUsuario;

		@Column
		private String senha;


		// Construtores
		public Usuario() {

		}

		public Usuario(Long idUsuario, String nomeUsuario, String senha) {
			this.idUsuario = idUsuario;
			this.nomeUsuario = nomeUsuario;
			this.senha = senha;
		}

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