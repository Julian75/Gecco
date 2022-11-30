package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.ChatRemitente;
import com.gecco.Repository.IChatRemitenteRepository;
import com.gecco.Service.IChatRemitenteService;

@Service
public class ChatRemitenteServiceImplement implements IChatRemitenteService{

	@Autowired
	private IChatRemitenteRepository repository;
	        
	
	@Override
	public List<ChatRemitente> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<ChatRemitente> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public ChatRemitente save(ChatRemitente chatRemitente) {
		return this.repository.save(chatRemitente);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
