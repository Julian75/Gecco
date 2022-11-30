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

import com.gecco.Entity.MediosRadiacion;
import com.gecco.Service.IMediosRadiacionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/MediosRadiacion")
public class MediosRadiacionController {
	@Autowired IMediosRadiacionService service;

	@GetMapping("/Obtener")
	public List<MediosRadiacion> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<MediosRadiacion> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MediosRadiacion save(@RequestBody MediosRadiacion mediosRadiacion) {
		return service.save(mediosRadiacion);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MediosRadiacion update(@PathVariable Long id, @RequestBody MediosRadiacion mediosRadiacion) {	
		Optional<MediosRadiacion> op = service.findById(id);
		
		MediosRadiacion mediosRadiacionUpdate = new MediosRadiacion();
		if (!op.isEmpty()) {			
			mediosRadiacionUpdate = op.get();					
			mediosRadiacionUpdate= mediosRadiacion;			
			mediosRadiacionUpdate.setId(id);
			
		}
		return service.save(mediosRadiacionUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
