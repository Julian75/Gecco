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

import com.gecco.Entity.AsignarTurno;
import com.gecco.Service.IAsignarTurnoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AsignarTurno")
public class AsignarTurnoController {

	@Autowired IAsignarTurnoService service;

	@GetMapping("/Obtener")
	public List<AsignarTurno> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AsignarTurno> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignarTurno save(@RequestBody AsignarTurno asignarTurno) {
		return service.save(asignarTurno);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignarTurno update(@PathVariable Long id, @RequestBody AsignarTurno asignarTurno) {	
		Optional<AsignarTurno> op = service.findById(id);
		
		AsignarTurno asignarTurnoUpdate = new AsignarTurno();
		if (!op.isEmpty()) {			
			asignarTurnoUpdate = op.get();					
			asignarTurnoUpdate= asignarTurno;			
			asignarTurnoUpdate.setId(id);
			
		}
		return service.save(asignarTurnoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
}
