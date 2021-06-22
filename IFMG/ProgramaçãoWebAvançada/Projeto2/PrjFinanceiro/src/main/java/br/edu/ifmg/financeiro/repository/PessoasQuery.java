package br.edu.ifmg.financeiro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.edu.ifmg.financeiro.model.Pessoa;
import br.edu.ifmg.financeiro.resource.filter.PessoaFilter;

public interface PessoasQuery {
	
	public Page<Pessoa> filtrar(PessoaFilter pessoaFilter, Pageable pageable);
	
}
