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

import com.gecco.Entity.Novedades;
import com.gecco.Service.INovedadesService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Novedades")
public class NovedadesController {

	@Autowired INovedadesService service;

	@GetMapping("/Obtener")
	public List<Novedades> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Novedades> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Novedades save(@RequestBody Novedades novedades) {
		return service.save(novedades);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Novedades update(@PathVariable Long id, @RequestBody Novedades novedades) {	
		Optional<Novedades> op = service.findById(id);
		
		Novedades novedadesUpdate = new Novedades();
		if (!op.isEmpty()) {			
			novedadesUpdate = op.get();					
			novedadesUpdate= novedades;			
			novedadesUpdate.setId(id);
			
		}
		return service.save(novedadesUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}