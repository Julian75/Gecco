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

import com.gecco.Entity.Turnos;
import com.gecco.Service.ITurnosService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Turnos")
public class TurnosController {

	@Autowired ITurnosService service;

	@GetMapping("/Obtener")
	public List<Turnos> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Turnos> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Turnos save(@RequestBody Turnos turnos) {
		return service.save(turnos);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Turnos update(@PathVariable Long id, @RequestBody Turnos turnos) {	
		Optional<Turnos> op = service.findById(id);
		
		Turnos turnosUpdate = new Turnos();
		if (!op.isEmpty()) {			
			turnosUpdate = op.get();					
			turnosUpdate= turnos;			
			turnosUpdate.setId(id);
			
		}
		return service.save(turnosUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
}
