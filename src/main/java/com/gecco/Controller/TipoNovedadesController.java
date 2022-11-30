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

import com.gecco.Entity.TipoNovedades;
import com.gecco.Service.ITipoNovedadesService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/TipoNovedades")
public class TipoNovedadesController {
	@Autowired ITipoNovedadesService service;

	@GetMapping("/Obtener")
	public List<TipoNovedades> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<TipoNovedades> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoNovedades save(@RequestBody TipoNovedades tipoNovedades) {
		return service.save(tipoNovedades);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoNovedades update(@PathVariable Long id, @RequestBody TipoNovedades tipoNovedades) {	
		Optional<TipoNovedades> op = service.findById(id);
		
		TipoNovedades tipoNovedadesUpdate = new TipoNovedades();
		if (!op.isEmpty()) {			
			tipoNovedadesUpdate = op.get();					
			tipoNovedadesUpdate= tipoNovedades;			
			tipoNovedadesUpdate.setId(id);
			
		}
		return service.save(tipoNovedades);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
