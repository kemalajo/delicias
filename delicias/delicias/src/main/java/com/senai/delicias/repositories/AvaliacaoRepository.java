package com.senai.delicias.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.delicias.entities.Avaliacao;
import com.senai.delicias.repositories.AvaliacaoRepository;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    // Aqui você pode adicionar consultas personalizadas, se quiser
}
