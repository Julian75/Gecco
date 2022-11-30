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


import com.gecco.Entity.Usuario;

import com.gecco.Service.IUsuarioService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Usuario")
public class UsuarioController {
	
	@Autowired IUsuarioService service;

	@GetMapping("Obtener")
	public List<Usuario> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Usuario> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Usuario save(@RequestBody Usuario usuario) {
		return service.save(usuario);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Usuario update(@PathVariable Long id, @RequestBody Usuario usuario) {	
		Optional<Usuario> op = service.findById(id);
		
		Usuario usuarioUpdate = new Usuario();
		if (!op.isEmpty()) {			
			usuarioUpdate = op.get();					
			usuarioUpdate= usuario;			
			usuarioUpdate.setId(id);
			
		}
		return service.save(usuario);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
