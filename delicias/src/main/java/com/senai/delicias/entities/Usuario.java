package com.senai.delicias.entities;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbCliente")
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
	@JoinColumn(name = "tipoCliente", nullable = false)
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


}
