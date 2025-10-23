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
public class Produto {

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
	private CategoriaProduto categoriaProduto;

	@ManyToOne
	@JoinColumn(name = "idTipoProduto", nullable = false)
	private TipoProduto tipoProduto;

	@ManyToOne
	@JoinColumn(name = "ornamentoId", nullable = true)
	private Ornamento ornamentoProduto;

	public Produto() {

	}

	// Construtores

	public Produto(Long idProduto, String nomeProduto, Double precoProduto, String descricaoProduto, String imgUrl,
			CategoriaProduto categoriaProduto, TipoProduto tipoProduto, Ornamento ornamentoProduto) {
		this.idProduto = idProduto;
		this.nomeProduto = nomeProduto;
		this.precoProduto = precoProduto;
		this.descricaoProduto = descricaoProduto;
		this.imgUrl = imgUrl;
		this.categoriaProduto = categoriaProduto;
		this.tipoProduto = tipoProduto;
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

	public CategoriaProduto getCategoriaProduto() {
		return categoriaProduto;
	}

	public void setCategoriaProduto(CategoriaProduto categoriaProduto) {
		this.categoriaProduto = categoriaProduto;
	}

	public TipoProduto getTipoEncomenda() {
		return tipoProduto;
	}

	public void setTipoEncomenda(TipoProduto tipoProduto) {
		this.tipoProduto = tipoProduto;
	}

	public Ornamento getOrnamentoProduto() {
		return ornamentoProduto;
	}

	public void setOrnamentoProduto(Ornamento ornamentoProduto) {
		this.ornamentoProduto = ornamentoProduto;
	}


}