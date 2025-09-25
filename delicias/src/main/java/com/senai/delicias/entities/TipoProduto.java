package com.senai.delicias.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name = "tbTipoProduto")
public class TipoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTipoProduto")
    private Long idTipoProduto;

    @Column(name = "nomeTipoProduto", nullable = false, length = 100)
    private String nomeTipoProduto;

    @Column(name = "descricaoTipoProduto")
    private String descricaoTipoProduto;

    @OneToMany(mappedBy = "tipoEncomenda")
    private List<Produto> produtos;

    public TipoProduto() {
    }

    public TipoProduto(Long idTipoProduto, String nomeTipoProduto, String descricaoTipoProduto) {
        this.idTipoProduto = idTipoProduto;
        this.nomeTipoProduto = nomeTipoProduto;
        this.descricaoTipoProduto = descricaoTipoProduto;
    }

    public Long getIdTipoProduto() {
        return idTipoProduto;
    }

    public void setIdTipoProduto(Long idTipoProduto) {
        this.idTipoProduto = idTipoProduto;
    }

    public String getNomeTipoProduto() {
        return nomeTipoProduto;
    }

    public void setNomeTipoProduto(String nomeTipoProduto) {
        this.nomeTipoProduto = nomeTipoProduto;
    }

    public String getDescricaoTipoProduto() {
        return descricaoTipoProduto;
    }

    public void setDescricaoTipoProduto(String descricaoTipoProduto) {
        this.descricaoTipoProduto = descricaoTipoProduto;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }
}
