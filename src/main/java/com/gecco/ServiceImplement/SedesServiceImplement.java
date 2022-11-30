package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Sedes;
import com.gecco.Repository.ISedesRepository;
import com.gecco.Service.ISedesService;

@Service
public class SedesServiceImplement implements ISedesService{
	
	@Autowired
	private ISedesRepository repository;
	        
	
	@Override
	public List<Sedes> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Sedes> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Sedes save(Sedes sedes) {
		return this.repository.save(sedes);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}