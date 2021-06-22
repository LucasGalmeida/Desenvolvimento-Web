package br.edu.ifmg.financeiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifmg.financeiro.model.Categoria;

public interface Categorias extends JpaRepository<Categoria, Long>, CategoriasQuery {

}
