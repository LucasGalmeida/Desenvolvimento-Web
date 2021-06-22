package br.edu.ifmg.financeiro.resource;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifmg.financeiro.model.Pessoa;
import br.edu.ifmg.financeiro.repository.Pessoas;
import br.edu.ifmg.financeiro.resource.filter.PessoaFilter;
import br.edu.ifmg.financeiro.service.PessoaService;

@RestController
@RequestMapping("/pessoas")
public class PessoaResource {

	@Autowired
	private Pessoas pessoas;
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private PessoaService pService;
	
	@GetMapping
	public ResponseEntity<?> listar(PessoaFilter pessoaFilter, Pageable pageable){
		Page<Pessoa> lista = pessoas.filtrar(pessoaFilter, pageable);
		return lista.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(lista);
	}
	
	@GetMapping("/{codigo}")
	public ResponseEntity<?> buscarPorCodigo(@PathVariable Long codigo){
		Optional<Pessoa> pes = pessoas.findById(codigo);
		return pes.isPresent() ? ResponseEntity.ok(pes.get()) : ResponseEntity.noContent().build();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void criar(@Valid @RequestBody Pessoa pessoa) {
		pessoas.save(pessoa);
	}
	
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long codigo) {
		pessoas.deleteById(codigo);
	}
	
	@PutMapping("/{codigo}")
	public ResponseEntity<Pessoa> atualizar(@PathVariable Long codigo,@Valid @RequestBody Pessoa pessoa){
		
		Optional<Pessoa> pes = pessoas.findById(codigo);
				
		if(!pes.isPresent())
			throw new EmptyResultDataAccessException(messageSource.getMessage("informacao.nao-encotrada", null, LocaleContextHolder.getLocale()), 1);
		
		Pessoa pessoaSalva = pes.get();
		BeanUtils.copyProperties(pessoa, pessoaSalva, "codigo");
		pessoas.save(pessoaSalva);
		
		return ResponseEntity.ok(pessoaSalva);
	}
	
	@PutMapping("/{codigo}/ativo")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizarPropriedadeAtivo(@PathVariable Long codigo, @RequestBody Boolean ativo) {
	
		pService.atualizaPropriedadeAtivo(codigo, ativo);
		
	}
	
	
}

