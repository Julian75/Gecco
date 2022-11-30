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

import com.gecco.Entity.AsignacionesProcesos;
import com.gecco.Service.IAsignacionesProcesosService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AsignacionesProcesos")
public class AsignacionesProcesosController {

	@Autowired IAsignacionesProcesosService service;

	@GetMapping("/Obtener")
	public List<AsignacionesProcesos> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AsignacionesProcesos> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionesProcesos save(@RequestBody AsignacionesProcesos asignacionesProcesos) {
		return service.save(asignacionesProcesos);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionesProcesos update(@PathVariable Long id, @RequestBody AsignacionesProcesos asignacionesProcesos) {	
		Optional<AsignacionesProcesos> op = service.findById(id);
		
		AsignacionesProcesos asignacionesProcesosUpdate = new AsignacionesProcesos();
		if (!op.isEmpty()) {			
			asignacionesProcesosUpdate = op.get();					
			asignacionesProcesosUpdate= asignacionesProcesos;			
			asignacionesProcesosUpdate.setId(id);
			
		}
		return service.save(asignacionesProcesosUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
