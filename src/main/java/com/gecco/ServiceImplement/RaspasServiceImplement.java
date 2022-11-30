package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Raspas;
import com.gecco.Repository.IRaspasRepository;
import com.gecco.Service.IRaspasService;

@Service
public class RaspasServiceImplement implements IRaspasService{

	@Autowired
	private IRaspasRepository repository;
	        
	
	@Override
	public List<Raspas> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Raspas> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Raspas save(Raspas raspas) {
		return this.repository.save(raspas);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
