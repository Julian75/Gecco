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

import com.gecco.Entity.AsignacionPuntoVentaArticulo;
import com.gecco.Service.IAsignacionPuntoVentaArticuloService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AsignacionPuntoVentaArticulo")
public class AsignacionPuntoVentaArticuloController {

	@Autowired IAsignacionPuntoVentaArticuloService service;

	@GetMapping("/Obtener")
	public List<AsignacionPuntoVentaArticulo> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AsignacionPuntoVentaArticulo> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionPuntoVentaArticulo save(@RequestBody AsignacionPuntoVentaArticulo asignacionPuntoVentaArticulo) {
		return service.save(asignacionPuntoVentaArticulo);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignacionPuntoVentaArticulo update(@PathVariable Long id, @RequestBody AsignacionPuntoVentaArticulo asignacionPuntoVentaArticulo) {	
		Optional<AsignacionPuntoVentaArticulo> op = service.findById(id);
		
		AsignacionPuntoVentaArticulo asignacionPuntoVentaArticuloUpdate = new AsignacionPuntoVentaArticulo();
		if (!op.isEmpty()) {			
			asignacionPuntoVentaArticuloUpdate = op.get();					
			asignacionPuntoVentaArticuloUpdate= asignacionPuntoVentaArticulo;			
			asignacionPuntoVentaArticuloUpdate.setId(id);
			
		}
		return service.save(asignacionPuntoVentaArticuloUpdate);

	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
