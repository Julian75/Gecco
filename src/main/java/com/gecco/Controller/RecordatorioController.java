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

import com.gecco.Entity.Recordatorio;
import com.gecco.Service.IRecordatorioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Recordatorio")
public class RecordatorioController {
	@Autowired IRecordatorioService service;

	@GetMapping("/Obtener")
	public List<Recordatorio> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Recordatorio> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Recordatorio save(@RequestBody Recordatorio recordatorio) {
		return service.save(recordatorio);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Recordatorio update(@PathVariable Long id, @RequestBody Recordatorio recordatorio) {	
		Optional<Recordatorio> op = service.findById(id);
		
		Recordatorio recordatorioUpdate = new Recordatorio();
		if (!op.isEmpty()) {			
			recordatorioUpdate = op.get();					
			recordatorioUpdate= recordatorio;			
			recordatorioUpdate.setId(id);
			
		}
		return service.save(recordatorioUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
