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

import com.gecco.Entity.Inventario;
import com.gecco.Service.IInventarioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Inventario")
public class InventarioController {
	@Autowired IInventarioService service;

	@GetMapping("/Obtener")
	public List<Inventario> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Inventario> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Inventario save(@RequestBody Inventario inventario) {
		return service.save(inventario);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Inventario update(@PathVariable Long id, @RequestBody Inventario inventario) {	
		Optional<Inventario> op = service.findById(id);
		
		Inventario inventarioUpdate = new Inventario();
		if (!op.isEmpty()) {			
			inventarioUpdate = op.get();					
			inventarioUpdate= inventario;			
			inventarioUpdate.setId(id);
			
		}
		return service.save(inventarioUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
