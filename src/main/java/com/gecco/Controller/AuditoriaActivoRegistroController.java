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

import com.gecco.Entity.AuditoriaActivoRegistro;
import com.gecco.Service.IAuditoriaActivoRegistroService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AuditoriaActivoRegistro")
public class AuditoriaActivoRegistroController {
	
	@Autowired IAuditoriaActivoRegistroService service;

	@GetMapping("/Obtener")
	public List<AuditoriaActivoRegistro> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AuditoriaActivoRegistro> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AuditoriaActivoRegistro save(@RequestBody AuditoriaActivoRegistro auditoriaActivoRegistro) {
		return service.save(auditoriaActivoRegistro);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AuditoriaActivoRegistro update(@PathVariable Long id, @RequestBody AuditoriaActivoRegistro auditoriaActivoRegistro) {	
		Optional<AuditoriaActivoRegistro> op = service.findById(id);
		
		AuditoriaActivoRegistro auditoriaActivoRegistroUpdate = new AuditoriaActivoRegistro();
		if (!op.isEmpty()) {			
			auditoriaActivoRegistroUpdate = op.get();					
			auditoriaActivoRegistroUpdate= auditoriaActivoRegistro;			
			auditoriaActivoRegistroUpdate.setId(id);
			
		}
		return service.save(auditoriaActivoRegistroUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
