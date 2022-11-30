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

import com.gecco.Entity.AsignarTurnoVendedor;
import com.gecco.Service.IAsignarTurnoVendedorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AsignarTurnoVendedor")
public class AsignarTurnoVendedorController {
	@Autowired IAsignarTurnoVendedorService service;

	@GetMapping("/Obtener")
	public List<AsignarTurnoVendedor> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<AsignarTurnoVendedor> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignarTurnoVendedor save(@RequestBody AsignarTurnoVendedor asignarTurnoVendedor) {
		return service.save(asignarTurnoVendedor);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AsignarTurnoVendedor update(@PathVariable Long id, @RequestBody AsignarTurnoVendedor asignarTurnoVendedor) {	
		Optional<AsignarTurnoVendedor> op = service.findById(id);
		
		AsignarTurnoVendedor asignarTurnoVendedorUpdate = new AsignarTurnoVendedor();
		if (!op.isEmpty()) {			
			asignarTurnoVendedorUpdate = op.get();					
			asignarTurnoVendedorUpdate= asignarTurnoVendedor;			
			asignarTurnoVendedorUpdate.setId(id);
			
		}
		return service.save(asignarTurnoVendedorUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
