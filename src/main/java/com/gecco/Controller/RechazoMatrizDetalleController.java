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

import com.gecco.Entity.RechazoMatrizDetalle;
import com.gecco.Service.IRechazoMatrizDetalleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/RechazoMatrizDetalle")
public class RechazoMatrizDetalleController {

	@Autowired IRechazoMatrizDetalleService service;

	@GetMapping("/Obtener")
	public List<RechazoMatrizDetalle> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<RechazoMatrizDetalle> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public RechazoMatrizDetalle save(@RequestBody RechazoMatrizDetalle rechazoMatrizDetalle) {
		return service.save(rechazoMatrizDetalle);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public RechazoMatrizDetalle update(@PathVariable Long id, @RequestBody RechazoMatrizDetalle rechazoMatrizDetalle) {	
		Optional<RechazoMatrizDetalle> op = service.findById(id);
		
		RechazoMatrizDetalle rechazoMatrizDetalleUpdate = new RechazoMatrizDetalle();
		if (!op.isEmpty()) {			
			rechazoMatrizDetalleUpdate = op.get();					
			rechazoMatrizDetalleUpdate= rechazoMatrizDetalle;			
			rechazoMatrizDetalleUpdate.setId(id);
			
		}
		return service.save(rechazoMatrizDetalleUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
