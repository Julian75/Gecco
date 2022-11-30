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

import com.gecco.Entity.ChatRemitente;
import com.gecco.Service.IChatRemitenteService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ChatRemitente")
public class ChatRemitenteController {

	@Autowired IChatRemitenteService service;

	@GetMapping("/Obtener")
	public List<ChatRemitente> all() {
		return service.all();
	}

	@GetMapping("/ObtenerId/{id}")
	public Optional<ChatRemitente> show(@PathVariable Long id) {
		return service.findById(id);
	}

	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ChatRemitente save(@RequestBody ChatRemitente chatRemitente) {
		return service.save(chatRemitente);
	}
	
	
	@PutMapping("/Modificar/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ChatRemitente update(@PathVariable Long id, @RequestBody ChatRemitente chatRemitente) {	
		Optional<ChatRemitente> op = service.findById(id);
		
		ChatRemitente chatRemitenteUpdate = new ChatRemitente();
		if (!op.isEmpty()) {			
			chatRemitenteUpdate = op.get();					
			chatRemitenteUpdate= chatRemitente;			
			chatRemitenteUpdate.setId(id);
			
		}
		return service.save(chatRemitenteUpdate);
				
	}
	
	@DeleteMapping("/Eliminar/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
