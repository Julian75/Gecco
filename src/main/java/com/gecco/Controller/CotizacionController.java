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

import com.gecco.Entity.Cotizacion;
import com.gecco.Service.ICotizacionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Cotizacion")
public class CotizacionController {

	@Autowired ICotizacionService service;

	@GetMapping("/Obtener")
	public List<Cotizacion> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Cotizacion> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Cotizacion save(@RequestBody Cotizacion cotizacion) {
		return service.save(cotizacion);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Cotizacion update(@PathVariable Long id, @RequestBody Cotizacion cotizacion) {	
		Optional<Cotizacion> op = service.findById(id);
		
		Cotizacion cotizacionUpdate = new Cotizacion();
		if (!op.isEmpty()) {			
			cotizacionUpdate = op.get();					
			cotizacionUpdate= cotizacion;			
			cotizacionUpdate.setId(id);
			
		}
		return service.save(cotizacionUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}