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

import com.gecco.Entity.MatrizNecesidad;
import com.gecco.Service.IMatrizNecesidadService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/MatrizNecesidad")
public class MatrizNecesidadController {

	@Autowired IMatrizNecesidadService service;

	@GetMapping("/Obtener")
	public List<MatrizNecesidad> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<MatrizNecesidad> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MatrizNecesidad save(@RequestBody MatrizNecesidad matrizNecesidad) {
		return service.save(matrizNecesidad);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MatrizNecesidad update(@PathVariable Long id, @RequestBody MatrizNecesidad matrizNecesidad) {	
		Optional<MatrizNecesidad> op = service.findById(id);
		
		MatrizNecesidad matrizNecesidadUpdate = new MatrizNecesidad();
		if (!op.isEmpty()) {			
			matrizNecesidadUpdate = op.get();					
			matrizNecesidadUpdate= matrizNecesidad;			
			matrizNecesidadUpdate.setId(id);
			
		}
		return service.save(matrizNecesidadUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
