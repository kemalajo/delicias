package com.senai.delicias.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_Cliente")
public class Usuario {
	
	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idCliente", nullable = false)
	private Long idCliente;

	@Column(name = "nomeCliente", nullable = false, length = 100)
	private String nomeCliente;

	@Column(name = "email", nullable = false, unique = true, length = 50)
	private String email;

	@Column(name = "telefone", nullable = false, unique = false)
	private String telefone;

	@ManyToOne
	@JoinColumn(name = "id_tipo_usuario", nullable = false)
	private TipoUsuario tipoUsuario;

	// Construtores
	public Usuario() {

	}

	public Usuario(Long idCliente, String nomeCliente, String email, String telefone, String senha, TipoUsuario tipoUsuario) {
		this.idCliente = idCliente ;
		this.nomeCliente  = nomeCliente ;
		this.email = email;
		this.telefone = telefone;
		this.tipoUsuario = tipoUsuario;

	}

	public Long getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}

	public String getNomeCliente() {
		return nomeCliente;
	}

	public void setNomeCliente(String nomeCliente) {
		this.nomeCliente = nomeCliente;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public TipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}

	public void setTipoUsuario(TipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}

	

}
