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

import com.gecco.Entity.ClientesAutorizacionPago;
import com.gecco.Service.IClienteAutorizacionPagoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ClienteAutorizacionPago")
public class ClienteAutorizacionPagoController {
	@Autowired IClienteAutorizacionPagoService service;

	@GetMapping("/Obtener")
	public List<ClientesAutorizacionPago> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<ClientesAutorizacionPago> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ClientesAutorizacionPago save(@RequestBody ClientesAutorizacionPago clienteSC) {
		return service.save(clienteSC);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ClientesAutorizacionPago update(@PathVariable Long id, @RequestBody ClientesAutorizacionPago clienteSC) {	
		Optional<ClientesAutorizacionPago> op = service.findById(id);
		
		ClientesAutorizacionPago clienteAutorizacionPagoUpdate = new ClientesAutorizacionPago();
		if (!op.isEmpty()) {			
			clienteAutorizacionPagoUpdate = op.get();					
			clienteAutorizacionPagoUpdate= clienteSC;			
			clienteAutorizacionPagoUpdate.setId(id);
			
		}
		return service.save(clienteAutorizacionPagoUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
