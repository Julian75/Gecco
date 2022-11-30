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

import com.gecco.Entity.DetalleArticulo;
import com.gecco.Service.IDetalleArticuloService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/DetalleArticulo")
public class DetalleArticuloController {

	@Autowired IDetalleArticuloService service;

	@GetMapping("/Obtener")
	public List<DetalleArticulo> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<DetalleArticulo> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public DetalleArticulo save(@RequestBody DetalleArticulo detalleArticulo) {
		return service.save(detalleArticulo);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public DetalleArticulo update(@PathVariable Long id, @RequestBody DetalleArticulo detalleArticulo) {	
		Optional<DetalleArticulo> op = service.findById(id);
		
		DetalleArticulo detalleArticuloUpdate = new DetalleArticulo();
		if (!op.isEmpty()) {			
			detalleArticuloUpdate = op.get();					
			detalleArticuloUpdate= detalleArticulo;			
			detalleArticuloUpdate.setId(id);
			
		}
		return service.save(detalleArticuloUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
