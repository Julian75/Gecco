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

import com.gecco.Entity.RechazarSolicitudAutorizacionPremios;
import com.gecco.Service.IRechazarSolicitudAutorizacionPremiosService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/RechazoSolicitudAutorizacionPremios")
public class RechazarSolicitudAutorizacionPremiosController {
	@Autowired IRechazarSolicitudAutorizacionPremiosService service;

	@GetMapping("/Obtener")
	public List<RechazarSolicitudAutorizacionPremios> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<RechazarSolicitudAutorizacionPremios> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public RechazarSolicitudAutorizacionPremios save(@RequestBody RechazarSolicitudAutorizacionPremios rechazoMatrizDetalle) {
		return service.save(rechazoMatrizDetalle);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public RechazarSolicitudAutorizacionPremios update(@PathVariable Long id, @RequestBody RechazarSolicitudAutorizacionPremios rechazoMatrizDetalle) {	
		Optional<RechazarSolicitudAutorizacionPremios> op = service.findById(id);
		
		RechazarSolicitudAutorizacionPremios rechazoMatrizDetalleUpdate = new RechazarSolicitudAutorizacionPremios();
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
