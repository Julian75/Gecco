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

import com.gecco.Entity.Visitas;
import com.gecco.Service.IVisitasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Visitas")
public class VisitasController {
	@Autowired IVisitasService service;

	@GetMapping("Obtener")
	public List<Visitas> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Visitas> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Visitas save(@RequestBody Visitas visitas) {
		return service.save(visitas);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Visitas update(@PathVariable Long id, @RequestBody Visitas visitas) {	
		Optional<Visitas> op = service.findById(id);
		
		Visitas visitasUpdate = new Visitas();
		if (!op.isEmpty()) {			
			visitasUpdate = op.get();					
			visitasUpdate= visitas;			
			visitasUpdate.setId(id);
			
		}
		return service.save(visitasUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
