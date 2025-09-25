package com.senai.delicias.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_categoriaProduto")
public class CategoriaProduto {
	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCategoria;

	@Column
	private String nomeCategoria;

	@Column
	private String descricaoCategoria;

	// Construtores
	public CategoriaProduto() {

	}

	public CategoriaProduto(Long idCategoria, String nome, String descricao) {
		this.idCategoria = idCategoria;
		this.nomeCategoria = nome;
		this.descricaoCategoria = descricao;
	}

	public Long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNomeCategoria() {
		return nomeCategoria;
	}

	public void setNomeCategoria(String nomeCategoria) {
		this.nomeCategoria = nomeCategoria;
	}

	public String getDescricaoCategoria() {
		return descricaoCategoria;
	}

	public void setDescricaoCategoria(String descricaoCategoria) {
		this.descricaoCategoria = descricaoCategoria;
	}

}