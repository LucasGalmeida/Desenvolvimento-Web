package br.edu.ifmg.financeiro.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.edu.ifmg.financeiro.model.Categoria;
import br.edu.ifmg.financeiro.resource.filter.CategoriaFilter;

public interface CategoriasQuery {

	public Page<Categoria> filtrar(CategoriaFilter categroaiFilter, Pageable pageable);
}
