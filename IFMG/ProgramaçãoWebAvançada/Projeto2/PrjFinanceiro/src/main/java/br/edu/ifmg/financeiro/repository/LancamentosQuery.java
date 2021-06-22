package br.edu.ifmg.financeiro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.edu.ifmg.financeiro.model.Lancamento;
import br.edu.ifmg.financeiro.projections.LancamentoResumo;
import br.edu.ifmg.financeiro.resource.filter.LancamentoFilter;

public interface LancamentosQuery {

	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	public Page<LancamentoResumo> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
	
}
