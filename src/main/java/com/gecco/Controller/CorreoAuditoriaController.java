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

import com.gecco.Entity.CorreoAuditoria;
import com.gecco.Service.ICorreoAuditoriaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/CorreoAuditoria")
public class CorreoAuditoriaController {
	
	@Autowired ICorreoAuditoriaService service;

	@GetMapping("/Obtener")
	public List<CorreoAuditoria> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<CorreoAuditoria> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public CorreoAuditoria save(@RequestBody CorreoAuditoria CorreoAuditoria) {
		return service.save(CorreoAuditoria);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public CorreoAuditoria update(@PathVariable Long id, @RequestBody CorreoAuditoria CorreoAuditoria) {	
		Optional<CorreoAuditoria> op = service.findById(id);
		
		CorreoAuditoria correoAuditoriaUpdate = new CorreoAuditoria();
		if (!op.isEmpty()) {			
			correoAuditoriaUpdate = op.get();					
			correoAuditoriaUpdate= CorreoAuditoria;			
			correoAuditoriaUpdate.setId(id);
			
		}
		return service.save(correoAuditoriaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
