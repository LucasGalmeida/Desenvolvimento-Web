package br.edu.ifmg.financeiro.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifmg.financeiro.exception.PessoaInexistenteOuInativaException;
import br.edu.ifmg.financeiro.model.Lancamento;
import br.edu.ifmg.financeiro.model.Pessoa;
import br.edu.ifmg.financeiro.repository.Lancamentos;
import br.edu.ifmg.financeiro.repository.Pessoas;

@Service
public class LancamentoService {

	@Autowired
	private Pessoas pessoas;
	
	@Autowired
	private Lancamentos lancamentos;
	
	public Lancamento salvar(Lancamento lancamento) {
		Optional<Pessoa> pessoa = pessoas.findById(lancamento.getPessoa().getCodigo());
		
		if(!pessoa.isPresent() || !pessoa.get().getAtivo()) {
			throw new PessoaInexistenteOuInativaException();
		}
		
		return lancamentos.save(lancamento);
		
	}
	
}
