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

import com.gecco.Entity.ArchivoSolicitud;
import com.gecco.Service.IArchivoSolicitudService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ArchivoSolicitud")
public class ArchivoSolicitudController {
	@Autowired IArchivoSolicitudService service;

	@GetMapping("/Obtener")
	public List<ArchivoSolicitud> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<ArchivoSolicitud> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ArchivoSolicitud save(@RequestBody ArchivoSolicitud archivoSolicitud) {
		return service.save(archivoSolicitud);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ArchivoSolicitud update(@PathVariable Long id, @RequestBody ArchivoSolicitud archivoSolicitud) {	
		Optional<ArchivoSolicitud> op = service.findById(id);
		
		ArchivoSolicitud archivoSolicitudUpdate = new ArchivoSolicitud();
		if (!op.isEmpty()) {			
			archivoSolicitudUpdate = op.get();					
			archivoSolicitudUpdate= archivoSolicitud;			
			archivoSolicitudUpdate.setId(id);
			
		}
		return service.save(archivoSolicitudUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}