package br.edu.ifmg.financeiro.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import br.edu.ifmg.financeiro.model.Pessoa;
import br.edu.ifmg.financeiro.resource.filter.PessoaFilter;

public class PessoasQueryImpl implements PessoasQuery {

	@PersistenceContext
	private EntityManager manager;
	
	@Override
	public Page<Pessoa> filtrar(PessoaFilter pessoaFilter, Pageable pageable) {
		
		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		int firstRecord = pageNumber * pageSize;
		
		String hql = "select p from Pessoa p where (1=1)";
				
		if(pessoaFilter.getNome() != null) {
			hql += "and (p.nome like '%"+pessoaFilter.getNome()+"%') ";
		}
		
		if(pessoaFilter.getEndereco() != null) {
			hql += "and (p.endereco.logradouro like '%"+pessoaFilter.getEndereco()+"%') ";
		}
		
		if(pessoaFilter.getAtivo() != null) {
			hql += "and (p.ativo = "+pessoaFilter.getAtivo()+") ";
		}
		
		List<Pessoa> result = manager.createQuery(hql, Pessoa.class)
									 .setFirstResult(firstRecord)
									 .setMaxResults(pageSize)
									 .getResultList();
		
		int total = getTotal(hql);
		return new PageImpl<>(result, pageable, total);
		
	}

	private int getTotal(String hql) {
		
		return manager.createQuery(hql, Pessoa.class)				 
				 .getResultList()
				 .size();
		
	}
	
}
