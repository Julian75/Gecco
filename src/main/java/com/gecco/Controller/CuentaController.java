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

import com.gecco.Entity.Cuenta;
import com.gecco.Service.ICuentaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Cuenta")
public class CuentaController {
	@Autowired ICuentaService service;

	@GetMapping("/Obtener")
	public List<Cuenta> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Cuenta> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Cuenta save(@RequestBody Cuenta cuenta) {
		return service.save(cuenta);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Cuenta update(@PathVariable Long id, @RequestBody Cuenta cuenta) {	
		Optional<Cuenta> op = service.findById(id);
		
		Cuenta cuentaUpdate = new Cuenta();
		if (!op.isEmpty()) {			
			cuentaUpdate = op.get();					
			cuentaUpdate= cuenta;			
			cuentaUpdate.setId(id);
			
		}
		return service.save(cuentaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
