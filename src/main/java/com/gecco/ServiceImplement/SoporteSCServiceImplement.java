package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.SoporteSC;
import com.gecco.Repository.ISoporteSCRepository;
import com.gecco.Service.ISoporteSCService;

@Service
public class SoporteSCServiceImplement implements ISoporteSCService{

	@Autowired
	private ISoporteSCRepository repository;
	        
	
	@Override
	public List<SoporteSC> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<SoporteSC> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public SoporteSC save(SoporteSC soporteSC) {
		return this.repository.save(soporteSC);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}