package br.edu.ifmg.financeiro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifmg.financeiro.model.Pessoa;

public interface Pessoas extends JpaRepository<Pessoa, Long>, PessoasQuery {

//	public Page	<Pessoa> findByNomeContaing(String nome, Pageable page);
	
}
