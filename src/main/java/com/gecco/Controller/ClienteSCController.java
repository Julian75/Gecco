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

import com.gecco.Entity.ClienteSC;
import com.gecco.Service.IClienteSCService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ClienteSC")
public class ClienteSCController {

	@Autowired IClienteSCService service;

	@GetMapping("/Obtener")
	public List<ClienteSC> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<ClienteSC> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ClienteSC save(@RequestBody ClienteSC clienteSC) {
		return service.save(clienteSC);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ClienteSC update(@PathVariable Long id, @RequestBody ClienteSC clienteSC) {	
		Optional<ClienteSC> op = service.findById(id);
		
		ClienteSC clienteSCUpdate = new ClienteSC();
		if (!op.isEmpty()) {			
			clienteSCUpdate = op.get();					
			clienteSCUpdate= clienteSC;			
			clienteSCUpdate.setId(id);
			
		}
		return service.save(clienteSCUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
