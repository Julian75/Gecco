package com.gecco.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gecco.Entity.Categoria;
import com.gecco.Service.ICategoriaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Categoria")
public class CategoriaController {

	@Autowired ICategoriaService service;

	@GetMapping("/Obtener")
	public List<Categoria> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Categoria> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Categoria save(@RequestBody Categoria categoria) {
		return service.save(categoria);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Categoria update(@PathVariable Long id, @RequestBody Categoria categoria) {	
		Optional<Categoria> op = service.findById(id);
		
		Categoria categoriaUpdate = new Categoria();
		if (!op.isEmpty()) {			
			categoriaUpdate = op.get();					
			categoriaUpdate= categoria;			
			categoriaUpdate.setId(id);
			
		}
		return service.save(categoriaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
