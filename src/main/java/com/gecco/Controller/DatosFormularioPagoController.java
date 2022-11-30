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

import com.gecco.Entity.DatosFormularioPago;
import com.gecco.Service.IDatosFormularioPagoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/DatosFormularioPago")
public class DatosFormularioPagoController {
	@Autowired IDatosFormularioPagoService service;

	@GetMapping("/Obtener")
	public List<DatosFormularioPago> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<DatosFormularioPago> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public DatosFormularioPago save(@RequestBody DatosFormularioPago datosFormulariosPago) {
		return service.save(datosFormulariosPago);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public DatosFormularioPago update(@PathVariable Long id, @RequestBody DatosFormularioPago datosFormulariosPago) {	
		Optional<DatosFormularioPago> op = service.findById(id);
		
		DatosFormularioPago datosFormularioPagoUpdate = new DatosFormularioPago();
		if (!op.isEmpty()) {			
			datosFormularioPagoUpdate = op.get();					
			datosFormularioPagoUpdate= datosFormulariosPago;			
			datosFormularioPagoUpdate.setId(id);
			
		}
		return service.save(datosFormularioPagoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
