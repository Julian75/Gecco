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

import com.gecco.Entity.AuditoriaActivo;
import com.gecco.Service.IAuditoriaActivoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AuditoriaActivo")
public class AuditoriaActivoController {

	@Autowired IAuditoriaActivoService service;

	@GetMapping("/Obtener")
	public List<AuditoriaActivo> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AuditoriaActivo> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AuditoriaActivo save(@RequestBody AuditoriaActivo AuditoriaActivo) {
		return service.save(AuditoriaActivo);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AuditoriaActivo update(@PathVariable Long id, @RequestBody AuditoriaActivo AuditoriaActivo) {	
		Optional<AuditoriaActivo> op = service.findById(id);
		
		AuditoriaActivo auditoriaActivoUpdate = new AuditoriaActivo();
		if (!op.isEmpty()) {			
			auditoriaActivoUpdate = op.get();					
			auditoriaActivoUpdate= AuditoriaActivo;			
			auditoriaActivoUpdate.setId(id);
			
		}
		return service.save(auditoriaActivoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
