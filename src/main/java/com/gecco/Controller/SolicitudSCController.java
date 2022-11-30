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

import com.gecco.Entity.SolicitudSC;
import com.gecco.Service.ISolicitudSCService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/SolicitudSC")
public class SolicitudSCController {

	@Autowired ISolicitudSCService service;

	@GetMapping("/Obtener")
	public List<SolicitudSC> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<SolicitudSC> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SolicitudSC save(@RequestBody SolicitudSC solicitudSC) {
		return service.save(solicitudSC);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SolicitudSC update(@PathVariable Long id, @RequestBody SolicitudSC solicitudSC) {	
		Optional<SolicitudSC> op = service.findById(id);
		
		SolicitudSC solicitudSCUpdate = new SolicitudSC();
		if (!op.isEmpty()) {			
			solicitudSCUpdate = op.get();					
			solicitudSCUpdate= solicitudSC;			
			solicitudSCUpdate.setId(id);
			
		}
		return service.save(solicitudSCUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
