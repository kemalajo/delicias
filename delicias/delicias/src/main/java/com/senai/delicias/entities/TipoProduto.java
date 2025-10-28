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
    @Column(name = "id_tipo_produto")
    private Long idTipoProduto;

    @Column(name = "nome_tipo_produto")
    private String nomeTipoProduto;

    @Column(name = "descricao_tipo_produto")
    private String descricaoTipoProduto;

    @OneToMany(mappedBy = "tipoProduto")
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
