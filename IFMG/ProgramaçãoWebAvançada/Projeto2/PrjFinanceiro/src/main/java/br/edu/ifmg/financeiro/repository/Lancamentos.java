package br.edu.ifmg.financeiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifmg.financeiro.model.Lancamento;

public interface Lancamentos extends JpaRepository<Lancamento, Long>, LancamentosQuery {

	
	
}
