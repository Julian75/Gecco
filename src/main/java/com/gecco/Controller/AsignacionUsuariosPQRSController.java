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

import com.gecco.Entity.AsignacionUsuariosPQRS;
import com.gecco.Service.IAsignacionUsuariosPQRSService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AsignacionUsuariosPqrs")
public class AsignacionUsuariosPQRSController {
	
	@Autowired IAsignacionUsuariosPQRSService service;

	@GetMapping("/Obtener")
	public List<AsignacionUsuariosPQRS> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AsignacionUsuariosPQRS> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionUsuariosPQRS save(@RequestBody AsignacionUsuariosPQRS asignacionUsuariosPqrs) {
		return service.save(asignacionUsuariosPqrs);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionUsuariosPQRS update(@PathVariable Long id, @RequestBody AsignacionUsuariosPQRS asignacionUsuariosPqrs) {	
		Optional<AsignacionUsuariosPQRS> op = service.findById(id);
		
		AsignacionUsuariosPQRS asignacionUsuariosPqrsUpdate = new AsignacionUsuariosPQRS();
		if (!op.isEmpty()) {			
			asignacionUsuariosPqrsUpdate = op.get();					
			asignacionUsuariosPqrsUpdate= asignacionUsuariosPqrs;			
			asignacionUsuariosPqrsUpdate.setId(id);
			
		}
		return service.save(asignacionUsuariosPqrsUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
