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

import com.gecco.Entity.MotivoSolicitud;
import com.gecco.Service.IMotivoSolicitudService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/MotivoSolicitud")
public class MotivoSolicitudController {

	@Autowired IMotivoSolicitudService service;

	@GetMapping("/Obtener")
	public List<MotivoSolicitud> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<MotivoSolicitud> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MotivoSolicitud save(@RequestBody MotivoSolicitud tipoSolicitud) {
		return service.save(tipoSolicitud);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MotivoSolicitud update(@PathVariable Long id, @RequestBody MotivoSolicitud tipoSolicitud) {	
		Optional<MotivoSolicitud> op = service.findById(id);
		
		MotivoSolicitud tipoSolicitudUpdate = new MotivoSolicitud();
		if (!op.isEmpty()) {			
			tipoSolicitudUpdate = op.get();					
			tipoSolicitudUpdate= tipoSolicitud;			
			tipoSolicitudUpdate.setId(id);
			
		}
		return service.save(tipoSolicitudUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}