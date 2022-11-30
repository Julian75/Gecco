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

import com.gecco.Entity.TipoNecesidad;
import com.gecco.Service.ITipoNecesidadService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/TipoNecesidad")
public class TipoNecesidadController {

	@Autowired ITipoNecesidadService service;

	@GetMapping("/Obtener")
	public List<TipoNecesidad> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<TipoNecesidad> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoNecesidad save(@RequestBody TipoNecesidad tipoNecesidad) {
		return service.save(tipoNecesidad);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoNecesidad update(@PathVariable Long id, @RequestBody TipoNecesidad tipoNecesidad) {	
		Optional<TipoNecesidad> op = service.findById(id);
		
		TipoNecesidad tipoNecesidadUpdate = new TipoNecesidad();
		if (!op.isEmpty()) {			
			tipoNecesidadUpdate = op.get();					
			tipoNecesidadUpdate= tipoNecesidad;			
			tipoNecesidadUpdate.setId(id);
			
		}
		return service.save(tipoNecesidadUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
