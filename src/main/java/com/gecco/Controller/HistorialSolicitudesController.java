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

import com.gecco.Entity.HistorialSolicitudes;
import com.gecco.Service.IHistorialSolicitudesService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/HistorialSolicitudes")
public class HistorialSolicitudesController {

	@Autowired IHistorialSolicitudesService service;

	@GetMapping("/Obtener")
	public List<HistorialSolicitudes> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<HistorialSolicitudes> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public HistorialSolicitudes save(@RequestBody HistorialSolicitudes historialSolicitudes) {
		return service.save(historialSolicitudes);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public HistorialSolicitudes update(@PathVariable Long id, @RequestBody HistorialSolicitudes historialSolicitudes) {	
		Optional<HistorialSolicitudes> op = service.findById(id);
		
		HistorialSolicitudes historialSolicitudesUpdate = new HistorialSolicitudes();
		if (!op.isEmpty()) {			
			historialSolicitudesUpdate = op.get();					
			historialSolicitudesUpdate= historialSolicitudes;			
			historialSolicitudesUpdate.setId(id);
			
		}
		return service.save(historialSolicitudesUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}