package com.senai.delicias.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class usuario {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long idUsuario;

	    private String nomeUsuario;
	    private String cpf;
	    private String email;
	    private String telefone;
	    private String dataNascimento;
	    private String senha; // armazenar com BCrypt idealmente

	    @ManyToOne(cascade = {})
	    @JoinColumn(name = "tipo_usuario_id")
	    private TipoUsuario tipoUsuario;

	    
	}

}
