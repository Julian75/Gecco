
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

import com.gecco.Entity.RegistroCorreo;
import com.gecco.Service.IRegistroCorreoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/RegistroCorreo")
public class RegistroCorreoController {
	@Autowired IRegistroCorreoService service;

	@GetMapping("/Obtener")
	public List<RegistroCorreo> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<RegistroCorreo> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public RegistroCorreo save(@RequestBody RegistroCorreo registroCorreo) {
		return service.save(registroCorreo);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public RegistroCorreo update(@PathVariable Long id, @RequestBody RegistroCorreo registroCorreo) {	
		Optional<RegistroCorreo> op = service.findById(id);
		
		RegistroCorreo registroUpdate = new RegistroCorreo();
		if (!op.isEmpty()) {			
			registroUpdate = op.get();					
			registroUpdate= registroCorreo;			
			registroUpdate.setId(id);
			
		}
		return service.save(registroUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}