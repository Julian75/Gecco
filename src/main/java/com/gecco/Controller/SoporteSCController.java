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

import com.gecco.Entity.SoporteSC;
import com.gecco.Service.ISoporteSCService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/SoporteSC")
public class SoporteSCController {

	@Autowired ISoporteSCService service;

	@GetMapping("/Obtener")
	public List<SoporteSC> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<SoporteSC> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SoporteSC save(@RequestBody SoporteSC soporteSC) {
		return service.save(soporteSC);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SoporteSC update(@PathVariable Long id, @RequestBody SoporteSC soporteSC) {	
		Optional<SoporteSC> op = service.findById(id);
		
		SoporteSC soporteSCUpdate = new SoporteSC();
		if (!op.isEmpty()) {			
			soporteSCUpdate = op.get();					
			soporteSCUpdate= soporteSC;			
			soporteSCUpdate.setId(id);
			
		}
		return service.save(soporteSCUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}