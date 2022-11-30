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

import com.gecco.Entity.EscalaSolicitudes;
import com.gecco.Service.IEscalaSolicitudesService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/EscalaSolicitudes")
public class EscalaSolicitudesController {
	@Autowired IEscalaSolicitudesService service;

	@GetMapping("/Obtener")
	public List<EscalaSolicitudes> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<EscalaSolicitudes> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public EscalaSolicitudes save(@RequestBody EscalaSolicitudes escalaSolicitudes) {
		return service.save(escalaSolicitudes);
	}

	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public EscalaSolicitudes update(@PathVariable Long id, @RequestBody EscalaSolicitudes escalaSolicitudes) {	
		Optional<EscalaSolicitudes> op = service.findById(id);
		
		EscalaSolicitudes escalaSolicitudesVenUpdate = new EscalaSolicitudes();
		if (!op.isEmpty()) {			
			escalaSolicitudesVenUpdate = op.get();					
			escalaSolicitudesVenUpdate= escalaSolicitudes;			
			escalaSolicitudesVenUpdate.setId(id);
			
		}
		return service.save(escalaSolicitudesVenUpdate);	
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}