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

import com.gecco.Entity.ArchivoSolicitudAutorizacionPago;
import com.gecco.Service.IArchivoSolicitudAutorizacionPagoService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ArchivoSolicitudAutorizacionPago")
public class ArchivoSolicitudAutorizacionPagoController {
	@Autowired IArchivoSolicitudAutorizacionPagoService service;

	@GetMapping("/Obtener")
	public List<ArchivoSolicitudAutorizacionPago> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<ArchivoSolicitudAutorizacionPago> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ArchivoSolicitudAutorizacionPago save(@RequestBody ArchivoSolicitudAutorizacionPago archivoSolicitudAutorizacionPago) {
		return service.save(archivoSolicitudAutorizacionPago);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ArchivoSolicitudAutorizacionPago update(@PathVariable Long id, @RequestBody ArchivoSolicitudAutorizacionPago archivoSolicitudAutorizacionPago) {	
		Optional<ArchivoSolicitudAutorizacionPago> op = service.findById(id);
		
		ArchivoSolicitudAutorizacionPago archivoSolicitudAutorizacionPagoUpdate = new ArchivoSolicitudAutorizacionPago();
		if (!op.isEmpty()) {			
			archivoSolicitudAutorizacionPagoUpdate = op.get();					
			archivoSolicitudAutorizacionPagoUpdate= archivoSolicitudAutorizacionPago;			
			archivoSolicitudAutorizacionPagoUpdate.setId(id);
			
		}
		return service.save(archivoSolicitudAutorizacionPagoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
