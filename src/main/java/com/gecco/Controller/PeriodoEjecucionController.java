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

import com.gecco.Entity.PeriodoEjecucion;
import com.gecco.Service.IPeriodoEjucucionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/PeriodoEjecucion")
public class PeriodoEjecucionController {

	@Autowired IPeriodoEjucucionService service;

	@GetMapping("/Obtener")
	public List<PeriodoEjecucion> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<PeriodoEjecucion> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PeriodoEjecucion save(@RequestBody PeriodoEjecucion periodoEjecucion) {
		return service.save(periodoEjecucion);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PeriodoEjecucion update(@PathVariable Long id, @RequestBody PeriodoEjecucion periodoEjecucion) {	
		Optional<PeriodoEjecucion> op = service.findById(id);
		
		PeriodoEjecucion periodoEjecucionUpdate = new PeriodoEjecucion();
		if (!op.isEmpty()) {			
			periodoEjecucionUpdate = op.get();					
			periodoEjecucionUpdate= periodoEjecucion;			
			periodoEjecucionUpdate.setId(id);
			
		}
		return service.save(periodoEjecucionUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
