package com.senai.delicias.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_avaliacoes")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao")
    private Long idAvaliacao;

    @Column(name = "nome_usuario")
    private String nomeUsuario;

    @Column(name = "nota")
    private String nota;

    
    @Column(name = "comentario")
    private String comentario;

    // Construtores
    public Avaliacao() {}

    public Avaliacao(String nomeUsuario, String nota, String comentario) {
        this.nomeUsuario = nomeUsuario;
        this.nota = nota;
        this.comentario = comentario;
    }

 // Getters e setters
	public Long getId() {
		return idAvaliacao;
	}

	public void setId(Long idAvaliacao) {
		this.idAvaliacao = idAvaliacao;
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}

	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

	public String getNota() {
		return nota;
	}

	public void setNota(String nota) {
		this.nota = nota;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
    
}
