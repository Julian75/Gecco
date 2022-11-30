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

import com.gecco.Entity.ArticulosBaja;
import com.gecco.Service.IArticulosBajaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ArticulosBaja")
public class ArticulosBajaController {

	@Autowired IArticulosBajaService service;

	@GetMapping("/Obtener")
	public List<ArticulosBaja> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<ArticulosBaja> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ArticulosBaja save(@RequestBody ArticulosBaja articulosBaja) {
		return service.save(articulosBaja);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ArticulosBaja update(@PathVariable Long id, @RequestBody ArticulosBaja articulosBaja) {	
		Optional<ArticulosBaja> op = service.findById(id);
		
		ArticulosBaja articulosBajaUpdate = new ArticulosBaja();
		if (!op.isEmpty()) {			
			articulosBajaUpdate = op.get();					
			articulosBajaUpdate= articulosBaja;			
			articulosBajaUpdate.setId(id);
			
		}
		return service.save(articulosBajaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
