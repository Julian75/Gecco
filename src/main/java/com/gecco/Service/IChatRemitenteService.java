package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.ChatRemitente;

public interface IChatRemitenteService {

	public List<ChatRemitente> all();
	
	public Optional<ChatRemitente> findById(Long id);
	
	public ChatRemitente save(ChatRemitente chatRemitente);
	
	public void delete(Long id);
}
