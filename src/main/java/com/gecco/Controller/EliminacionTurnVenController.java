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

import com.gecco.Entity.EliminacionTurnVen;
import com.gecco.Service.IEliminacionTurnVenService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/AprobacionEliminacionTurnoVendedor")
public class EliminacionTurnVenController {

	@Autowired IEliminacionTurnVenService service;

	@GetMapping("/Obtener")
	public List<EliminacionTurnVen> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<EliminacionTurnVen> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public EliminacionTurnVen save(@RequestBody EliminacionTurnVen eliminacionTurnVen) {
		return service.save(eliminacionTurnVen);
	}

	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public EliminacionTurnVen update(@PathVariable Long id, @RequestBody EliminacionTurnVen eliminacionTurnVen) {	
		Optional<EliminacionTurnVen> op = service.findById(id);
		
		EliminacionTurnVen eliminacionTurnVenUpdate = new EliminacionTurnVen();
		if (!op.isEmpty()) {			
			eliminacionTurnVenUpdate = op.get();					
			eliminacionTurnVenUpdate= eliminacionTurnVen;			
			eliminacionTurnVenUpdate.setId(id);
			
		}
		return service.save(eliminacionTurnVenUpdate);	
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
}