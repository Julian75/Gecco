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

import com.gecco.Entity.IngresoPersonalEmpresa;
import com.gecco.Service.IIngresoPersonalEmpresaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/IngresoPersonalEmpresa")
public class IngresoPersonalEmpresaController {
	
	@Autowired IIngresoPersonalEmpresaService service;

	@GetMapping("/Obtener")
	public List<IngresoPersonalEmpresa> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<IngresoPersonalEmpresa> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public IngresoPersonalEmpresa save(@RequestBody IngresoPersonalEmpresa ingresoPersonalEmpresa) {
		return service.save(ingresoPersonalEmpresa);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public IngresoPersonalEmpresa update(@PathVariable Long id, @RequestBody IngresoPersonalEmpresa ingresoPersonalEmpresa) {	
		Optional<IngresoPersonalEmpresa> op = service.findById(id);
		
		IngresoPersonalEmpresa ingresoPersonalEmpresaUpdate = new IngresoPersonalEmpresa();
		if (!op.isEmpty()) {			
			ingresoPersonalEmpresaUpdate = op.get();					
			ingresoPersonalEmpresaUpdate= ingresoPersonalEmpresa;			
			ingresoPersonalEmpresaUpdate.setId(id);
			
		}
		return service.save(ingresoPersonalEmpresaUpdate); 
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}