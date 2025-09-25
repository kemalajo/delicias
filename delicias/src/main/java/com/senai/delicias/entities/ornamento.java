package com.senai.delicias.entities;


import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbOrnamento")
public class ornamento {

	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idOrnamento;

	@Column
	private String nome;

	@OneToMany(mappedBy = "ornamentoProduto")
	private List<produto> produtos;

	public ornamento() {

	}

	// Construtores

	public ornamento(Long idOrnamento, String nome, String tipo, List<produto> produtos) {
		super();
		this.idOrnamento = idOrnamento;
		this.nome = nome;
		this.produtos = produtos;
	}

	// Getters e Setters

	public Long getIdOrnamento() {
		return idOrnamento;
	}

	public void setIdOrnamento(Long idOrnamento) {
		this.idOrnamento = idOrnamento;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<produto> produtos) {
		this.produtos = produtos;
	}

}