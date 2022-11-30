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

import com.gecco.Entity.TipoTurno;
import com.gecco.Service.ITipoTurnoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/tipoTurno")
public class TipoTurnoController {
	@Autowired ITipoTurnoService service;

	@GetMapping("/Obtener")
	public List<TipoTurno> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<TipoTurno> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoTurno save(@RequestBody TipoTurno tipoTurno) {
		return service.save(tipoTurno);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoTurno update(@PathVariable Long id, @RequestBody TipoTurno tipoTurno) {	
		Optional<TipoTurno> op = service.findById(id);
		
		TipoTurno tipoTurnoUpdate = new TipoTurno();
		if (!op.isEmpty()) {			
			tipoTurnoUpdate = op.get();					
			tipoTurnoUpdate= tipoTurno;			
			tipoTurnoUpdate.setId(id);
			
		}
		return service.save(tipoTurno);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}