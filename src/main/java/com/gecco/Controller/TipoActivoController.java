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

import com.gecco.Entity.TipoActivo;
import com.gecco.Service.ITipoActivoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/TipoActivo")
public class TipoActivoController {

	@Autowired ITipoActivoService service;

	@GetMapping("/Obtener")
	public List<TipoActivo> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<TipoActivo> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoActivo save(@RequestBody TipoActivo tipoActivo) {
		return service.save(tipoActivo);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoActivo update(@PathVariable Long id, @RequestBody TipoActivo tipoActivo) {	
		Optional<TipoActivo> op = service.findById(id);
		
		TipoActivo tipoActivoUpdate = new TipoActivo();
		if (!op.isEmpty()) {			
			tipoActivoUpdate = op.get();					
			tipoActivoUpdate= tipoActivo;			
			tipoActivoUpdate.setId(id);
			
		}
		return service.save(tipoActivoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
