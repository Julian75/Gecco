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

import com.gecco.Entity.AsignacionesArticulos;
import com.gecco.Service.IAsignacionesArticulosService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AsignacionesArticulos")
public class AsignacionesArticulosController {

	@Autowired IAsignacionesArticulosService service;

	@GetMapping("/Obtener")
	public List<AsignacionesArticulos> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AsignacionesArticulos> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionesArticulos save(@RequestBody AsignacionesArticulos asignacionesArticulos) {
		return service.save(asignacionesArticulos);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionesArticulos update(@PathVariable Long id, @RequestBody AsignacionesArticulos asignacionesArticulos) {	
		Optional<AsignacionesArticulos> op = service.findById(id);
		
		AsignacionesArticulos asignacionesArticulosUpdate = new AsignacionesArticulos();
		if (!op.isEmpty()) {			
			asignacionesArticulosUpdate = op.get();					
			asignacionesArticulosUpdate= asignacionesArticulos;			
			asignacionesArticulosUpdate.setId(id);
			
		}
		return service.save(asignacionesArticulosUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
