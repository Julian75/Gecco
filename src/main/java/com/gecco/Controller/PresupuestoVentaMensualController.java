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

import com.gecco.Entity.PresupuestoVentaMensual;
import com.gecco.Service.IPresupuestoVentaMensualService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/PresupuestoVentaMensual")
public class PresupuestoVentaMensualController {
	

	@Autowired IPresupuestoVentaMensualService service;

	@GetMapping("/Obtener")
	public List<PresupuestoVentaMensual> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<PresupuestoVentaMensual> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PresupuestoVentaMensual save(@RequestBody PresupuestoVentaMensual presupuestoVentaMensual) {
		return service.save(presupuestoVentaMensual);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PresupuestoVentaMensual update(@PathVariable Long id, @RequestBody PresupuestoVentaMensual presupuestoVentaMensual) {	
		Optional<PresupuestoVentaMensual> op = service.findById(id);
		
		PresupuestoVentaMensual presupuestoVentaMensualUpdate = new PresupuestoVentaMensual();
		if (!op.isEmpty()) {			
			presupuestoVentaMensualUpdate = op.get();					
			presupuestoVentaMensualUpdate= presupuestoVentaMensual;			
			presupuestoVentaMensualUpdate.setId(id);
			
		}
		return service.save(presupuestoVentaMensualUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
