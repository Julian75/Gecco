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

import com.gecco.Entity.ElementosVisita;
import com.gecco.Service.IElementosVisitaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ElementosVisita")
public class ElementosVisitaController {
	@Autowired IElementosVisitaService service;

	@GetMapping("/Obtener")
	public List<ElementosVisita> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<ElementosVisita> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ElementosVisita save(@RequestBody ElementosVisita elementosVisita) {
		return service.save(elementosVisita);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ElementosVisita update(@PathVariable Long id, @RequestBody ElementosVisita elementosVisita) {	
		Optional<ElementosVisita> op = service.findById(id);
		
		ElementosVisita elementosVisitaUpdate = new ElementosVisita();
		if (!op.isEmpty()) {			
			elementosVisitaUpdate = op.get();					
			elementosVisitaUpdate= elementosVisita;			
			elementosVisitaUpdate.setId(id);
			
		}
		return service.save(elementosVisitaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
