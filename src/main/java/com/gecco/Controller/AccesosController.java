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

import com.gecco.Entity.Accesos;
import com.gecco.Service.IAccesosService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Accesos")
public class AccesosController {
	
	@Autowired IAccesosService service;

	@GetMapping("/Obtener")
	public List<Accesos> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Accesos> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Accesos save(@RequestBody Accesos accesos) {
		return service.save(accesos);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Accesos update(@PathVariable Long id, @RequestBody Accesos accesos) {	
		Optional<Accesos> op = service.findById(id);
		
		Accesos accesosUpdate = new Accesos();
		if (!op.isEmpty()) {			
			accesosUpdate = op.get();					
			accesosUpdate= accesos;			
			accesosUpdate.setId(id);
			
		}
		return service.save(accesosUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
