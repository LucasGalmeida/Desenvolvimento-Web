package br.edu.ifmg.financeiro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifmg.financeiro.model.Usuario;

public interface usuarios extends JpaRepository<Usuario, Long>, UsuariosQuery {

	public Optional<Usuario> findByEmail(String nome);
	
}
