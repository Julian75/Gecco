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

import com.gecco.Entity.VisitaDetalle;
import com.gecco.Service.IVisitaDetalleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/VisitaDetalle")
public class VisitaDetalleController {
	@Autowired IVisitaDetalleService service;

	@GetMapping("Obtener")
	public List<VisitaDetalle> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<VisitaDetalle> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public VisitaDetalle save(@RequestBody VisitaDetalle VisitaDetalle) {
		return service.save(VisitaDetalle);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public VisitaDetalle update(@PathVariable Long id, @RequestBody VisitaDetalle VisitaDetalle) {	
		Optional<VisitaDetalle> op = service.findById(id);
		
		VisitaDetalle VisitaDetalleUpdate = new VisitaDetalle();
		if (!op.isEmpty()) {			
			VisitaDetalleUpdate = op.get();					
			VisitaDetalleUpdate= VisitaDetalle;			
			VisitaDetalleUpdate.setId(id);
			
		}
		return service.save(VisitaDetalleUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
