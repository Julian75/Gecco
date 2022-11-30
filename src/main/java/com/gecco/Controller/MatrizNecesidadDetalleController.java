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

import com.gecco.Entity.MatrizNecesidadDetalle;
import com.gecco.Service.IMatrizNecesidadDetalleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/MatrizNecesidadDetalle")
public class MatrizNecesidadDetalleController {

	@Autowired IMatrizNecesidadDetalleService service;

	@GetMapping("/Obtener")
	public List<MatrizNecesidadDetalle> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<MatrizNecesidadDetalle> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MatrizNecesidadDetalle save(@RequestBody MatrizNecesidadDetalle matrizNecesidadDetalle) {
		return service.save(matrizNecesidadDetalle);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MatrizNecesidadDetalle update(@PathVariable Long id, @RequestBody MatrizNecesidadDetalle matrizNecesidadDetalle) {	
		Optional<MatrizNecesidadDetalle> op = service.findById(id);
		
		MatrizNecesidadDetalle matrizNecesidadDetalleUpdate = new MatrizNecesidadDetalle();
		if (!op.isEmpty()) {			
			matrizNecesidadDetalleUpdate = op.get();					
			matrizNecesidadDetalleUpdate= matrizNecesidadDetalle;			
			matrizNecesidadDetalleUpdate.setId(id);
			
		}
		return service.save(matrizNecesidadDetalleUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
}
