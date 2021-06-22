package br.edu.ifmg.financeiro.resource;

import java.util.List;
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

import br.edu.ifmg.financeiro.model.Categoria;
import br.edu.ifmg.financeiro.repository.Categorias;
import br.edu.ifmg.financeiro.resource.filter.CategoriaFilter;

@RestController
@RequestMapping("/categorias")
public class CategoriaResource {
	
	@Autowired
	private Categorias categorias;
	
	@Autowired
	private MessageSource messageSource;
	
	@GetMapping
	public ResponseEntity<?> listar(CategoriaFilter categoriaFilter, Pageable pageable){
		Page<Categoria> lista = categorias.filtrar(categoriaFilter, pageable);
		return lista.isEmpty() ? ResponseEntity.noContent().build()
							 : ResponseEntity.ok(lista);
	}
	
//	@GetMapping
//	public ResponseEntity<?> listar(){
//		List<Categoria> lista = categorias.findAll();
//		return lista.isEmpty() ? ResponseEntity.noContent().build()
//							 : ResponseEntity.ok(lista);
//	}
	
	@GetMapping("/{codigo}")
	public ResponseEntity<?> buscarPorCodigo(@PathVariable Long codigo) {
		
		Optional<Categoria> categ = categorias.findById(codigo);
		
		return categ.isPresent() ? ResponseEntity.ok(categ)
								 : ResponseEntity.noContent().build();
		//return categ.get();
		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED) // 201
	public void criar(@Valid @RequestBody Categoria categoria) {
		categorias.save(categoria);
	}
	
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT) // 204
	public void remover(@PathVariable Long codigo) {
		
//		Optional<Categoria> categ = categorias.findById(codigo);
//		
//		if (categ.isPresent())
//			categorias.delete(categ.get());
		
		categorias.deleteById(codigo);
	}
	
	@PutMapping("/{codigo}")
	public ResponseEntity<Categoria> atualizar(@PathVariable Long codigo, @Valid @RequestBody Categoria categoria){
		
		Optional<Categoria> categ = categorias.findById(codigo);
		
		if (!categ.isPresent())
			throw new EmptyResultDataAccessException(messageSource.getMessage("informacao.nao-encontrada", null, LocaleContextHolder.getLocale()), 1);
		
		Categoria categoriaSalva = categ.get();
		
		BeanUtils.copyProperties(categoria, categoriaSalva, "codigo");
		
		categorias.save(categoriaSalva);
		
		return ResponseEntity.ok(categoriaSalva);
	}
	
}
