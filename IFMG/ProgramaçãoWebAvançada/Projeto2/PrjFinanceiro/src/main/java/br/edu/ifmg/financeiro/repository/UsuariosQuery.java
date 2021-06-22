package br.edu.ifmg.financeiro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.edu.ifmg.financeiro.model.Usuario;
import br.edu.ifmg.financeiro.resource.filter.UsuarioFilter;

public interface UsuariosQuery {

	public Page<Usuario> filtrar(UsuarioFilter usuarioFilter, Pageable pageable);
	
}
