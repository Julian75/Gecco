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

import com.gecco.Entity.OrdenCompra;
import com.gecco.Service.IOrdenCompraService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/OrdenCompra")
public class OrdenCompraController {

	@Autowired IOrdenCompraService service;

	@GetMapping("/Obtener")
	public List<OrdenCompra> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<OrdenCompra> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public OrdenCompra save(@RequestBody OrdenCompra ordenCompra) {
		return service.save(ordenCompra);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public OrdenCompra update(@PathVariable Long id, @RequestBody OrdenCompra ordenCompra) {	
		Optional<OrdenCompra> op = service.findById(id);
		
		OrdenCompra ordenCompraUpdate = new OrdenCompra();
		if (!op.isEmpty()) {			
			ordenCompraUpdate = op.get();					
			ordenCompraUpdate= ordenCompra;			
			ordenCompraUpdate.setId(id);
			
		}
		return service.save(ordenCompraUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
