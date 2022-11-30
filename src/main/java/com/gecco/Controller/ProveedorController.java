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

import com.gecco.Entity.Proveedor;
import com.gecco.Service.IProveedorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Proveedor")
public class ProveedorController {

	@Autowired IProveedorService service;

	@GetMapping("/Obtener")
	public List<Proveedor> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Proveedor> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Proveedor save(@RequestBody Proveedor proveedor) {
		return service.save(proveedor);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Proveedor update(@PathVariable Long id, @RequestBody Proveedor proveedor) {	
		Optional<Proveedor> op = service.findById(id);
		
		Proveedor proveedorUpdate = new Proveedor();
		if (!op.isEmpty()) {			
			proveedorUpdate = op.get();					
			proveedorUpdate= proveedor;			
			proveedorUpdate.setId(id);
			
		}
		return service.save(proveedorUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}