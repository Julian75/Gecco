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

import com.gecco.Entity.Solicitud;
import com.gecco.Service.ISolicitudService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Solicitud")
public class SolicitudController {

	@Autowired ISolicitudService service;

	@GetMapping("/Obtener")
	public List<Solicitud> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Solicitud> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Solicitud save(@RequestBody Solicitud solicitud) {
		return service.save(solicitud);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Solicitud update(@PathVariable Long id, @RequestBody Solicitud solicitud) {	
		Optional<Solicitud> op = service.findById(id);
		
		Solicitud solicitudUpdate = new Solicitud();
		if (!op.isEmpty()) {			
			solicitudUpdate = op.get();					
			solicitudUpdate= solicitud;			
			solicitudUpdate.setId(id);
			
		}
		return service.save(solicitudUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}