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

import com.gecco.Entity.Proceso;
import com.gecco.Service.IProcesoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Proceso")
public class ProcesoController {

	@Autowired IProcesoService service;

	@GetMapping("/Obtener")
	public List<Proceso> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Proceso> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Proceso save(@RequestBody Proceso proceso) {
		return service.save(proceso);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Proceso update(@PathVariable Long id, @RequestBody Proceso proceso) {	
		Optional<Proceso> op = service.findById(id);
		
		Proceso procesoUpdate = new Proceso();
		if (!op.isEmpty()) {			
			procesoUpdate = op.get();					
			procesoUpdate= proceso;			
			procesoUpdate.setId(id);
			
		}
		return service.save(procesoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
