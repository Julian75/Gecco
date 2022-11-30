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

import com.gecco.Entity.MovimientoComprasInventario;
import com.gecco.Service.IMovimientoComprasInventarioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/MovimientoComprasInventario")
public class MovimientoComprasInventarioController {
	@Autowired IMovimientoComprasInventarioService service;

	@GetMapping("/Obtener")
	public List<MovimientoComprasInventario> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<MovimientoComprasInventario> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MovimientoComprasInventario save(@RequestBody MovimientoComprasInventario movimientoComprasInventario) {
		return service.save(movimientoComprasInventario);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public MovimientoComprasInventario update(@PathVariable Long id, @RequestBody MovimientoComprasInventario movimientoComprasInventario) {	
		Optional<MovimientoComprasInventario> op = service.findById(id);
		
		MovimientoComprasInventario movimientoComprasInventarioUpdate = new MovimientoComprasInventario();
		if (!op.isEmpty()) {			
			movimientoComprasInventarioUpdate = op.get();					
			movimientoComprasInventarioUpdate= movimientoComprasInventario;			
			movimientoComprasInventarioUpdate.setId(id);
			
		}
		return service.save(movimientoComprasInventarioUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
