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

import com.gecco.Entity.DetalleSolicitud;
import com.gecco.Service.IDetalleSolicitudService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/DetalleSolicitud")
public class DetalleSolicitudController {

	@Autowired IDetalleSolicitudService service;

	@GetMapping("/Obtener")
	public List<DetalleSolicitud> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<DetalleSolicitud> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public DetalleSolicitud save(@RequestBody DetalleSolicitud detalleSolicitud) {
		return service.save(detalleSolicitud);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public DetalleSolicitud update(@PathVariable Long id, @RequestBody DetalleSolicitud detalleSolicitud) {	
		Optional<DetalleSolicitud> op = service.findById(id);
		
		DetalleSolicitud detalleSolicitudUpdate = new DetalleSolicitud();
		if (!op.isEmpty()) {			
			detalleSolicitudUpdate = op.get();					
			detalleSolicitudUpdate= detalleSolicitud;			
			detalleSolicitudUpdate.setId(id);
			
		}
		return service.save(detalleSolicitudUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
