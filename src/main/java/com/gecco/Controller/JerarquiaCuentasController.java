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

import com.gecco.Entity.JerarquiaCuentas;
import com.gecco.Service.IJerarquiaCuentasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/JerarquiaCuentas")
public class JerarquiaCuentasController {
	@Autowired IJerarquiaCuentasService service;

	@GetMapping("/Obtener")
	public List<JerarquiaCuentas> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<JerarquiaCuentas> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public JerarquiaCuentas save(@RequestBody JerarquiaCuentas jerarquia) {
		return service.save(jerarquia);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public JerarquiaCuentas update(@PathVariable Long id, @RequestBody JerarquiaCuentas jerarquiaCuentas) {	
		Optional<JerarquiaCuentas> op = service.findById(id);
		
		JerarquiaCuentas jerarquiaCuentasUpdate = new JerarquiaCuentas();
		if (!op.isEmpty()) {			
			jerarquiaCuentasUpdate = op.get();					
			jerarquiaCuentasUpdate= jerarquiaCuentas;			
			jerarquiaCuentasUpdate.setId(id);
			
		}
		return service.save(jerarquiaCuentasUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
