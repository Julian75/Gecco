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

import com.gecco.Entity.TipoDocumento;

import com.gecco.Service.ITipoDocumentoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/TipoDocumento")
public class TipoDocumentoController {
	
	@Autowired ITipoDocumentoService service;

	@GetMapping("/Obtener")
	public List<TipoDocumento> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<TipoDocumento> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoDocumento save(@RequestBody TipoDocumento tipoDocumento) {
		return service.save(tipoDocumento);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public TipoDocumento update(@PathVariable Long id, @RequestBody TipoDocumento tipoDocumento) {	
		Optional<TipoDocumento> op = service.findById(id);
		
		TipoDocumento tipoDocumentoUpdate = new TipoDocumento();
		if (!op.isEmpty()) {			
			tipoDocumentoUpdate = op.get();					
			tipoDocumentoUpdate= tipoDocumento;			
			tipoDocumentoUpdate.setId(id);
			
		}
		return service.save(tipoDocumento);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
