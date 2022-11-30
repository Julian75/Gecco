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

import com.gecco.Entity.GestionProceso;
import com.gecco.Service.IGestionProcesoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/GestionProceso")
public class GestionProcesoController {

	@Autowired IGestionProcesoService service;

	@GetMapping("/Obtener")
	public List<GestionProceso> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<GestionProceso> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public GestionProceso save(@RequestBody GestionProceso gestionProceso) {
		return service.save(gestionProceso);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public GestionProceso update(@PathVariable Long id, @RequestBody GestionProceso gestionProceso) {	
		Optional<GestionProceso> op = service.findById(id);
		
		GestionProceso gestionProcesoUpdate = new GestionProceso();
		if (!op.isEmpty()) {			
			gestionProcesoUpdate = op.get();					
			gestionProcesoUpdate= gestionProceso;			
			gestionProcesoUpdate.setId(id);
			
		}
		return service.save(gestionProcesoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
