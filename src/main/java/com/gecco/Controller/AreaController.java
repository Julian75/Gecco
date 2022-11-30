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

import com.gecco.Entity.Area;
import com.gecco.Service.IAreaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Area")
public class AreaController {
	@Autowired IAreaService service;

	@GetMapping("/Obtener")
	public List<Area> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<Area> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Area save(@RequestBody Area area) {
		return service.save(area);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Area update(@PathVariable Long id, @RequestBody Area area) {	
		Optional<Area> op = service.findById(id);
		
		Area areaUpdate = new Area();
		if (!op.isEmpty()) {			
			areaUpdate = op.get();					
			areaUpdate= area;			
			areaUpdate.setId(id);
			
		}
		return service.save(areaUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
