package br.edu.ifmg.financeiro.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import br.edu.ifmg.financeiro.model.Categoria;
import br.edu.ifmg.financeiro.resource.filter.CategoriaFilter;

public class CategoriasQueryImpl implements CategoriasQuery {

	@PersistenceContext
	private EntityManager manager;
	
	@Override
	public Page<Categoria> filtrar(CategoriaFilter categoriaFilter, Pageable pageable) {

		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();		
		int firstRecord = pageNumber * pageSize;
		
		String hql = "select c from Categoria c ";
		
		if(categoriaFilter.getNome() != null) {
			hql += " where c.nome like '%"+categoriaFilter.getNome()+"%' ";
		}
		
		List<Categoria> result = manager.createQuery(hql, Categoria.class)
										.setFirstResult(firstRecord)
										.setMaxResults(pageSize)
										.getResultList();
		int total=getTotal(hql);
		return new PageImpl<Categoria>(result, pageable, total);
	}

	private int getTotal(String hql) {
		List<Categoria> result = manager.createQuery(hql, Categoria.class)
				.getResultList();
		return result.size();
	}
	
}
