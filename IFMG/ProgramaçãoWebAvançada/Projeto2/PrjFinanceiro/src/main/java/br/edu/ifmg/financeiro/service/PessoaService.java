package br.edu.ifmg.financeiro.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifmg.financeiro.model.Pessoa;
import br.edu.ifmg.financeiro.repository.Pessoas;

@Service
public class PessoaService {
	
	@Autowired
	private Pessoas pessoas;
	
	@Autowired
	private MessageSource messageSource;

	public void atualizaPropriedadeAtivo(Long codigo, Boolean ativo) {
		
		Pessoa pessoa = buscarPorId(codigo);
		
		if(pessoa == null) {
			throw new EmptyResultDataAccessException(messageSource.getMessage("informacao.nao-encotrada", null, LocaleContextHolder.getLocale()), 1);		
		}
		

		pessoa.setAtivo(ativo);
		pessoas.save(pessoa);	
		
	}

	public Pessoa buscarPorId(Long codigo) {
		Optional<Pessoa> pes = pessoas.findById(codigo);
		return pes.isPresent() ? pes.get() : null;
	}
}
