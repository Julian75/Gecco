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

import com.gecco.Entity.UsuariosAdministracion;
import com.gecco.Service.IUsuariosAdministracionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/UsuariosAdministracion")
public class UsuariosAdministracionController {

	@Autowired IUsuariosAdministracionService service;

	@GetMapping("/Obtener")
	public List<UsuariosAdministracion> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<UsuariosAdministracion> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public UsuariosAdministracion save(@RequestBody UsuariosAdministracion usuariosAdministracion) {
		return service.save(usuariosAdministracion);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public UsuariosAdministracion update(@PathVariable Long id, @RequestBody UsuariosAdministracion usuariosAdministracion) {	
		Optional<UsuariosAdministracion> op = service.findById(id);
		
		UsuariosAdministracion usuariosAdministracionUpdate = new UsuariosAdministracion();
		if (!op.isEmpty()) {			
			usuariosAdministracionUpdate = op.get();					
			usuariosAdministracionUpdate= usuariosAdministracion;			
			usuariosAdministracionUpdate.setId(id);
			
		}
		return service.save(usuariosAdministracionUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
