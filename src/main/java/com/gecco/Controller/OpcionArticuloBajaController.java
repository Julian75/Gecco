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

import com.gecco.Entity.OpcionArticuloBaja;
import com.gecco.Service.IOpcionArticuloBajaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/OpcionArticuloBaja")
public class OpcionArticuloBajaController {

	@Autowired IOpcionArticuloBajaService service;

	@GetMapping("/Obtener")
	public List<OpcionArticuloBaja> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<OpcionArticuloBaja> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public OpcionArticuloBaja save(@RequestBody OpcionArticuloBaja opcionArticuloBaja) {
		return service.save(opcionArticuloBaja);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public OpcionArticuloBaja update(@PathVariable Long id, @RequestBody OpcionArticuloBaja opcionArticuloBaja) {	
		Optional<OpcionArticuloBaja> op = service.findById(id);
		
		OpcionArticuloBaja opcionArticuloBajaUpdate = new OpcionArticuloBaja();
		if (!op.isEmpty()) {			
			opcionArticuloBajaUpdate = op.get();					
			opcionArticuloBajaUpdate= opcionArticuloBaja;			
			opcionArticuloBajaUpdate.setId(id);
			
		}
		return service.save(opcionArticuloBajaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
