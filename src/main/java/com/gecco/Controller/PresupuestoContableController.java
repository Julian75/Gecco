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

import com.gecco.Entity.PresupuestoContable;
import com.gecco.Service.IPresupuestoContableService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/PresupuestoContable")
public class PresupuestoContableController {
	@Autowired IPresupuestoContableService service;

	@GetMapping("/Obtener")
	public List<PresupuestoContable> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<PresupuestoContable> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PresupuestoContable save(@RequestBody PresupuestoContable presupuestoContable) {
		return service.save(presupuestoContable);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PresupuestoContable update(@PathVariable Long id, @RequestBody PresupuestoContable presupuestoContable) {	
		Optional<PresupuestoContable> op = service.findById(id);
		
		PresupuestoContable presupuestoContableUpdate = new PresupuestoContable();
		if (!op.isEmpty()) {			
			presupuestoContableUpdate = op.get();					
			presupuestoContableUpdate= presupuestoContable;			
			presupuestoContableUpdate.setId(id);
			
		}
		return service.save(presupuestoContableUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
