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
@Table(name = "tb_encomenda")
public class encomenda {

	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEncomenda;

	@Column
	private String nomeEncomenda;

	@Column
	private Double precoEncomenda;

	@Column
	private String descricaoEncomenda;

	@Column
	private String imgUrl;

	@ManyToOne
	@JoinColumn(name = "categoriaEncomenda", nullable = false)
	private categoriaProduto categoriaProduto;

	@ManyToOne
	@JoinColumn(name = "tipoProdutoId", nullable = false)
	private tipoEncomenda tipoEncomenda;

	@ManyToOne
	@JoinColumn(name = "ornamentoId", nullable = true)
	private ornamento ornamentoEncomenda;

	public encomenda() {

	}

	// Construtores

	public encomenda(Long idEncomenda, String nomeEncomenda, Double precoEncomenda, String descricaoEncomenda, String imgUrl,
			tipoEncomenda tipoEncomenda, categoriaProduto categoriaProduto, ornamento ornamentoEncomenda) {
		this.idEncomenda = idEncomenda;
		this.nomeEncomenda = nomeEncomenda;
		this.precoEncomenda = precoEncomenda;
		this.descricaoEncomenda = descricaoEncomenda;
		this.imgUrl = imgUrl;
		this.categoriaProduto = categoriaProduto;
		this.tipoEncomenda = tipoEncomenda;
		this.ornamentoEncomenda = ornamentoEncomenda;
	}
	
	// Getters e Setters

	public Long getIdEncomenda() {
		return idEncomenda;
	}

	public void setIdEncomenda(Long idEncomenda) {
		this.idEncomenda = idEncomenda;
	}

	public String getNomeEncomenda() {
		return nomeEncomenda;
	}

	public void setNomeEncomenda(String nomeEncomenda) {
		this.nomeEncomenda = nomeEncomenda;
	}

	public Double getPrecoEncomenda() {
		return precoEncomenda;
	}

	public void setPrecoEncomenda(Double precoEncomenda) {
		this.precoEncomenda = precoEncomenda;
	}

	public String getDescricaoEncomenda() {
		return descricaoEncomenda;
	}

	public void setDescricaoEncomenda(String descricaoEncomenda) {
		this.descricaoEncomenda = descricaoEncomenda;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public categoriaProduto getCategoriaProduto() {
		return categoriaProduto;
	}

	public void setCategoriaProduto(categoriaProduto categoriaProduto) {
		this.categoriaProduto = categoriaProduto;
	}

	public tipoEncomenda getTipoEncomenda() {
		return tipoEncomenda;
	}

	public void setTipoEncomenda(tipoEncomenda tipoEncomenda) {
		this.tipoEncomenda = tipoEncomenda;
	}

	public ornamento getOrnamentoEncomenda() {
		return ornamentoEncomenda;
	}

	public void setOrnamentoEncomenda(ornamento ornamentoEncomenda) {
		this.ornamentoEncomenda = ornamentoEncomenda;
	}




	
	
}