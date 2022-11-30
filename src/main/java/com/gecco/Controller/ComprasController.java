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

import com.gecco.Entity.Compra;
import com.gecco.Service.IComprasService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Compra")
public class ComprasController {

	@Autowired IComprasService service;

	@GetMapping("/Obtener")
	public List<Compra> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Compra> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Compra save(@RequestBody Compra compra) {
		return service.save(compra);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Compra update(@PathVariable Long id, @RequestBody Compra compra) {	
		Optional<Compra> op = service.findById(id);
		
		Compra compraUpdate = new Compra();
		if (!op.isEmpty()) {			
			compraUpdate = op.get();					
			compraUpdate= compra;			
			compraUpdate.setId(id);
			
		}
		return service.save(compraUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
