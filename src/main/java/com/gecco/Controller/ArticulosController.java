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

import com.gecco.Entity.Articulos;
import com.gecco.Service.IArticulosService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Articulo")
public class ArticulosController {

	@Autowired IArticulosService service;

	@GetMapping("/Obtener")
	public List<Articulos> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Articulos> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Articulos save(@RequestBody Articulos articulos) {
		return service.save(articulos);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Articulos update(@PathVariable Long id, @RequestBody Articulos articulos) {	
		Optional<Articulos> op = service.findById(id);
		
		Articulos articulosUpdate = new Articulos();
		if (!op.isEmpty()) {			
			articulosUpdate = op.get();					
			articulosUpdate= articulos;			
			articulosUpdate.setId(id);
			
		}
		return service.save(articulosUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}