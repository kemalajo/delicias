package com.senai.delicias.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.delicias.entities.TipoProduto;

@Repository
public interface TipoProdutoRepository extends JpaRepository<TipoProduto, Long> {

	// TipoProduto save(TipoProduto tipoProduto);

}
