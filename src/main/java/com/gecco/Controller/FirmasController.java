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

import com.gecco.Entity.Firmas;
import com.gecco.Service.IFirmasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Firmas")
public class FirmasController {
	

	@Autowired IFirmasService service;

	@GetMapping("/Obtener")
	public List<Firmas> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Firmas> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Firmas save(@RequestBody Firmas firmas) {
		return service.save(firmas);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Firmas update(@PathVariable Long id, @RequestBody Firmas firmas) {	
		Optional<Firmas> op = service.findById(id);
		
		Firmas firmasUpdate = new Firmas();
		if (!op.isEmpty()) {			
			firmasUpdate = op.get();					
			firmasUpdate= firmas;			
			firmasUpdate.setId(id);
			
		}
		return service.save(firmasUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
