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

import com.gecco.Entity.OpcionesVisita;
import com.gecco.Service.IOpcionesVisitaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/OpcionesVisita")
public class OpcionesVisitaController {
	@Autowired IOpcionesVisitaService service;

	@GetMapping("Obtener")
	public List<OpcionesVisita> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<OpcionesVisita> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public OpcionesVisita save(@RequestBody OpcionesVisita opcionesVisita) {
		return service.save(opcionesVisita);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public OpcionesVisita update(@PathVariable Long id, @RequestBody OpcionesVisita opcionesVisita) {	
		Optional<OpcionesVisita> op = service.findById(id);
		
		OpcionesVisita opcionesVisitaUpdate = new OpcionesVisita();
		if (!op.isEmpty()) {			
			opcionesVisitaUpdate = op.get();					
			opcionesVisitaUpdate= opcionesVisita;			
			opcionesVisitaUpdate.setId(id);
			
		}
		return service.save(opcionesVisitaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}