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

import com.gecco.Entity.Raspas;
import com.gecco.Service.IRaspasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Raspas")
public class RaspasController {

	@Autowired IRaspasService service;

	@GetMapping("/Obtener")
	public List<Raspas> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Raspas> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Raspas save(@RequestBody Raspas raspas) {
		return service.save(raspas);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Raspas update(@PathVariable Long id, @RequestBody Raspas raspas) {	
		Optional<Raspas> op = service.findById(id);
		
		Raspas raspasUpdate = new Raspas();
		if (!op.isEmpty()) {			
			raspasUpdate = op.get();					
			raspasUpdate= raspas;			
			raspasUpdate.setId(id);
			
		}
		return service.save(raspasUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
