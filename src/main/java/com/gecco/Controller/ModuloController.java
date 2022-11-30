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

import com.gecco.Entity.Modulo;
import com.gecco.Service.IModuloService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Modulo")

public class ModuloController {
	
	@Autowired IModuloService service;

	@GetMapping("/Obtener")
	public List<Modulo> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Modulo> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Modulo save(@RequestBody Modulo modulo) {
		return service.save(modulo);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Modulo update(@PathVariable Long id, @RequestBody Modulo modulo) {	
		Optional<Modulo> op = service.findById(id);
		
		Modulo moduloUpdate = new Modulo();
		if (!op.isEmpty()) {			
			moduloUpdate = op.get();					
			moduloUpdate= modulo;			
			moduloUpdate.setId(id);
			
		}
		return service.save(moduloUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	

}