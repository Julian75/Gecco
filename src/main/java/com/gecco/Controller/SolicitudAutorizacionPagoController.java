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

import com.gecco.Entity.SolicitudAutorizacionPago;
import com.gecco.Service.ISolicitudAutorizacionPagoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/SolicitudAutorizacionPago")
public class SolicitudAutorizacionPagoController {
	@Autowired ISolicitudAutorizacionPagoService service;

	@GetMapping("/Obtener")
	public List<SolicitudAutorizacionPago> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<SolicitudAutorizacionPago> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SolicitudAutorizacionPago save(@RequestBody SolicitudAutorizacionPago solicitudAutorizacionPago) {
		return service.save(solicitudAutorizacionPago);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SolicitudAutorizacionPago update(@PathVariable Long id, @RequestBody SolicitudAutorizacionPago solicitudAutorizacionPago) {	
		Optional<SolicitudAutorizacionPago> op = service.findById(id);
		
		SolicitudAutorizacionPago solicitudAutorizacionPagoUpdate = new SolicitudAutorizacionPago();
		if (!op.isEmpty()) {			
			solicitudAutorizacionPagoUpdate = op.get();					
			solicitudAutorizacionPagoUpdate= solicitudAutorizacionPago;			
			solicitudAutorizacionPagoUpdate.setId(id);
			
		}
		return service.save(solicitudAutorizacionPagoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
