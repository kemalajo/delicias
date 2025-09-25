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
@Table(name = "tb_produtos")
public class produto {

	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idProduto;

	@Column
	private String nomeProduto;

	@Column
	private Double precoProduto;

	@Column
	private String descricaoProduto;

	@Column
	private String imgUrl;

	@ManyToOne
	@JoinColumn(name = "categoriaProduto", nullable = false)
	private categoriaProduto categoriaProduto;

	@ManyToOne
	@JoinColumn(name = "tipoProdutoId", nullable = false)
	private tipoEncomenda tipoEncomenda;

	@ManyToOne
	@JoinColumn(name = "ornamentoId", nullable = true)
	private ornamento ornamentoProduto;

	public produto() {

	}

	// Construtores

	public produto(Long idProduto, String nomeProduto, Double precoProduto, String descricaoProduto, String imgUrl,
			categoriaProduto categoriaProduto, tipoEncomenda tipoEncomenda, ornamento ornamentoProduto) {
		this.idProduto = idProduto;
		this.nomeProduto = nomeProduto;
		this.precoProduto = precoProduto;
		this.descricaoProduto = descricaoProduto;
		this.imgUrl = imgUrl;
		this.categoriaProduto = categoriaProduto;
		this.tipoEncomenda = tipoEncomenda;
		this.ornamentoProduto = ornamentoProduto;
	}

	// Getters e Setters

	public Long getIdProduto() {
		return idProduto;
	}

	public void setIdProduto(Long idProduto) {
		this.idProduto = idProduto;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
	}

	public Double getPrecoProduto() {
		return precoProduto;
	}

	public void setPrecoProduto(Double precoProduto) {
		this.precoProduto = precoProduto;
	}

	public String getDescricaoProduto() {
		return descricaoProduto;
	}

	public void setDescricaoProduto(String descricaoProduto) {
		this.descricaoProduto = descricaoProduto;
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

	public ornamento getOrnamentoProduto() {
		return ornamentoProduto;
	}

	public void setOrnamentoProduto(ornamento ornamentoProduto) {
		this.ornamentoProduto = ornamentoProduto;
	}


}