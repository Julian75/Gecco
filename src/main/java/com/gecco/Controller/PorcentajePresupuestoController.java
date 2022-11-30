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

import com.gecco.Entity.PorcentajePresupuesto;
import com.gecco.Service.IPorcentajePresupuestoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/PorcentajePresupuesto")
public class PorcentajePresupuestoController {

	@Autowired IPorcentajePresupuestoService service;

	@GetMapping("/Obtener")
	public List<PorcentajePresupuesto> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<PorcentajePresupuesto> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PorcentajePresupuesto save(@RequestBody PorcentajePresupuesto porcentajePresupuesto) {
		return service.save(porcentajePresupuesto);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public PorcentajePresupuesto update(@PathVariable Long id, @RequestBody PorcentajePresupuesto porcentajePresupuesto) {	
		Optional<PorcentajePresupuesto> op = service.findById(id);
		
		PorcentajePresupuesto porcentajePresupuestoUpdate = new PorcentajePresupuesto();
		if (!op.isEmpty()) {			
			porcentajePresupuestoUpdate = op.get();					
			porcentajePresupuestoUpdate= porcentajePresupuesto;			
			porcentajePresupuestoUpdate.setId(id);
			
		}
		return service.save(porcentajePresupuestoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
