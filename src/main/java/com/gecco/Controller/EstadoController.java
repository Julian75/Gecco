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

import com.gecco.Entity.Estado;
import com.gecco.Service.IEstadoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Estado")
public class EstadoController {

	@Autowired IEstadoService service;

	@GetMapping("/Obtener")
	public List<Estado> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Estado> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Estado save(@RequestBody Estado Estado) {
		return service.save(Estado);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Estado update(@PathVariable Long id, @RequestBody Estado estado) {	
		Optional<Estado> op = service.findById(id);
		
		Estado estadoUpdate = new Estado();
		if (!op.isEmpty()) {			
			estadoUpdate = op.get();					
			estadoUpdate= estado;			
			estadoUpdate.setId(id);
			
		}
		return service.save(estadoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
}
