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

import com.gecco.Entity.Jerarquia;
import com.gecco.Service.IJerarquiaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Jerarquia")
public class JerarquiaController {
	@Autowired IJerarquiaService service;

	@GetMapping("/Obtener")
	public List<Jerarquia> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Jerarquia> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Jerarquia save(@RequestBody Jerarquia jerarquia) {
		return service.save(jerarquia);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Jerarquia update(@PathVariable Long id, @RequestBody Jerarquia jerarquia) {	
		Optional<Jerarquia> op = service.findById(id);
		
		Jerarquia jerarquiaUpdate = new Jerarquia();
		if (!op.isEmpty()) {			
			jerarquiaUpdate = op.get();					
			jerarquiaUpdate= jerarquia;			
			jerarquiaUpdate.setId(id);
			
		}
		return service.save(jerarquiaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
