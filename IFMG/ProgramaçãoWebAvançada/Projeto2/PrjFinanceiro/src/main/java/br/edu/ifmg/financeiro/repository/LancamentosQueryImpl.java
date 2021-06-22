package br.edu.ifmg.financeiro.repository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import br.edu.ifmg.financeiro.model.Lancamento;
import br.edu.ifmg.financeiro.projections.LancamentoResumo;
import br.edu.ifmg.financeiro.resource.filter.LancamentoFilter;

public class LancamentosQueryImpl implements LancamentosQuery {

	@PersistenceContext
	private EntityManager manager;
	
	@Override
	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable) {
		
		String hql = "select l from lancamento l where (1=1) ";
		List<Lancamento> result = null;
		
		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		int firstRecord = pageNumber * pageSize;
		
		if(lancamentoFilter.getDescricao() != null) {
			hql += " and (l.descricao like '%"+ lancamentoFilter.getDescricao() +"%') ";
		}
		
		if(lancamentoFilter.getTipoLancamento() != null) {
			hql += " and (l.tipo = '"+ lancamentoFilter.getTipoLancamento() +"') ";
		}
					
		if(lancamentoFilter.getDataPagamento() != null) {
			//hql += " and (l.dataPagamento =  :dtPagto )";
			hql += " and (l.dataPagamento =  '"+formatDate(lancamentoFilter.getDataPagamento())+"') ";
		}
		
		if(lancamentoFilter.getDataVencimento() != null) {
			hql += " and (l.dataPagamento =  '"+formatDate(lancamentoFilter.getDataVencimento())+"') ";
		}
		
		result = manager.createQuery(hql, Lancamento.class)
						.setFirstResult(firstRecord)
						.setMaxResults(pageSize)
						.getResultList();
		
		int total=getTotal(hql);
		return new PageImpl<Lancamento>(result, pageable, total);
	}

	private int getTotal(String hql) {
		
		List<Lancamento> result = manager.createQuery(hql).getResultList();
		return result.size();
	
	}
	
	private String formatDate(Date d) {
		return new SimpleDateFormat("yyyy-MM-dd").format(d);
	}
//	Long codigo, String descricao, Date datavencimento, Date dataPagamento, Float valor,
	//String observacao, String tipo, String categoria, String pessoa
	@Override
	public Page<LancamentoResumo> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
		
		String hql = "select new br.edu.ifmg.financeiro.projections.LancamentoResumo( "
				+ "l.codigo, l.descricao, l.dataVencimento, l.dataPagamento, l.valor, "
				+ "l.observacao, l.tipo, l.categoria.nome, l.pessoa.nome) "
				+ "from lancamento l where (1=1) ";
		List<LancamentoResumo> result = null;
		
		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		int firstRecord = pageNumber * pageSize;
		
		if(lancamentoFilter.getDescricao() != null) {
			hql += " and (l.descricao like '%"+ lancamentoFilter.getDescricao() +"%') ";
		}
		
		if(lancamentoFilter.getTipoLancamento() != null) {
			hql += " and (l.tipo = '"+ lancamentoFilter.getTipoLancamento() +"') ";
		}
					
		if(lancamentoFilter.getDataPagamento() != null) {
			//hql += " and (l.dataPagamento =  :dtPagto )";
			hql += " and (l.dataPagamento =  '"+formatDate(lancamentoFilter.getDataPagamento())+"') ";
		}
		
		if(lancamentoFilter.getDataVencimento() != null) {
			hql += " and (l.dataPagamento =  '"+formatDate(lancamentoFilter.getDataVencimento())+"') ";
		}
		
		result = manager.createQuery(hql, LancamentoResumo.class)
						.setFirstResult(firstRecord)
						.setMaxResults(pageSize)
						.getResultList();
		
		int total=getTotal(hql);
		return new PageImpl<LancamentoResumo>(result, pageable, total);
	}
	
}
