package com.senai.delicias.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.senai.delicias.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}