package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.ClienteSC;
import com.gecco.Repository.IClienteSCRepository;
import com.gecco.Service.IClienteSCService;

@Service
public class ClienteSCServiceImplement implements IClienteSCService{

	@Autowired
	private IClienteSCRepository repository;
	        
	
	@Override
	public List<ClienteSC> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<ClienteSC> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public ClienteSC save(ClienteSC clienteSC) {
		return this.repository.save(clienteSC);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
