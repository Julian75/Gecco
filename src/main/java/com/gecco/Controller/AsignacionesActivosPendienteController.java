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

import com.gecco.Entity.AsignacionesActivosPendiente;
import com.gecco.Service.IAsignacionesActivosPendienteService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AsignacionesActivosPendiente")
public class AsignacionesActivosPendienteController {
	
	@Autowired IAsignacionesActivosPendienteService service;

	@GetMapping("/Obtener")
	public List<AsignacionesActivosPendiente> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AsignacionesActivosPendiente> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionesActivosPendiente save(@RequestBody AsignacionesActivosPendiente asignacionesActivosPendiente) {
		return service.save(asignacionesActivosPendiente);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionesActivosPendiente update(@PathVariable Long id, @RequestBody AsignacionesActivosPendiente asignacionesActivosPendiente) {	
		Optional<AsignacionesActivosPendiente> op = service.findById(id);
		
		AsignacionesActivosPendiente asignacionesActivosPendienteUpdate = new AsignacionesActivosPendiente();
		if (!op.isEmpty()) {			
			asignacionesActivosPendienteUpdate = op.get();					
			asignacionesActivosPendienteUpdate= asignacionesActivosPendiente;			
			asignacionesActivosPendienteUpdate.setId(id);
			
		}
		return service.save(asignacionesActivosPendienteUpdate);
		
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
