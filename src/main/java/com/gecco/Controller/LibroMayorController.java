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

import com.gecco.Entity.LibroMayor;
import com.gecco.Service.ILibroMayorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/LibroMayor")
public class LibroMayorController {
	@Autowired ILibroMayorService service;

	@GetMapping("/Obtener")
	public List<LibroMayor> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<LibroMayor> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public LibroMayor save(@RequestBody LibroMayor libroMayor) {
		return service.save(libroMayor);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public LibroMayor update(@PathVariable Long id, @RequestBody LibroMayor libroMayor) {	
		Optional<LibroMayor> op = service.findById(id);
		
		LibroMayor libroMayorUpdate = new LibroMayor();
		if (!op.isEmpty()) {			
			libroMayorUpdate = op.get();					
			libroMayorUpdate= libroMayor;			
			libroMayorUpdate.setId(id);
			
		}
		return service.save(libroMayorUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
