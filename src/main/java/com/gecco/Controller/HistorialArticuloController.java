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

import com.gecco.Entity.HistorialArticulo;
import com.gecco.Service.IHistorialArticuloService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/HistorialArticulo")
public class HistorialArticuloController {

	@Autowired IHistorialArticuloService service;

	@GetMapping("/Obtener")
	public List<HistorialArticulo> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<HistorialArticulo> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public HistorialArticulo save(@RequestBody HistorialArticulo historialArticulo) {
		return service.save(historialArticulo);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public HistorialArticulo update(@PathVariable Long id, @RequestBody HistorialArticulo historialArticulo) {	
		Optional<HistorialArticulo> op = service.findById(id);
		
		HistorialArticulo historialArticuloUpdate = new HistorialArticulo();
		if (!op.isEmpty()) {			
			historialArticuloUpdate = op.get();					
			historialArticuloUpdate= historialArticulo;			
			historialArticuloUpdate.setId(id);
			
		}
		return service.save(historialArticuloUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
