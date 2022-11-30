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

import com.gecco.Entity.SubProceso;
import com.gecco.Service.ISubProcesoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/SubProceso")
public class SubProcesoController {

	@Autowired ISubProcesoService service;

	@GetMapping("/Obtener")
	public List<SubProceso> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<SubProceso> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SubProceso save(@RequestBody SubProceso subProceso) {
		return service.save(subProceso);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public SubProceso update(@PathVariable Long id, @RequestBody SubProceso subProceso) {	
		Optional<SubProceso> op = service.findById(id);
		
		SubProceso subProcesoUpdate = new SubProceso();
		if (!op.isEmpty()) {			
			subProcesoUpdate = op.get();					
			subProcesoUpdate= subProceso;			
			subProcesoUpdate.setId(id);
			
		}
		return service.save(subProcesoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
