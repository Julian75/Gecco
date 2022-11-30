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

import com.gecco.Entity.Configuracion;
import com.gecco.Service.IConfiguracionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Configuracion")
public class ConfiguracionController {
	@Autowired IConfiguracionService service;

	@GetMapping("/Obtener")
	public List<Configuracion> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Configuracion> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Configuracion save(@RequestBody Configuracion configuracion) {
		return service.save(configuracion);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Configuracion update(@PathVariable Long id, @RequestBody Configuracion configuracion) {	
		Optional<Configuracion> op = service.findById(id);
		
		Configuracion configuracionUpdate = new Configuracion();
		if (!op.isEmpty()) {			
			configuracionUpdate = op.get();					
			configuracionUpdate= configuracion;			
			configuracionUpdate.setId(id);
			
		}
		return service.save(configuracionUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
