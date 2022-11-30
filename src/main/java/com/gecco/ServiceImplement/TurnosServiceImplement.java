package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Turnos;
import com.gecco.Repository.ITurnosRepository;
import com.gecco.Service.ITurnosService;

@Service
public class TurnosServiceImplement implements ITurnosService{

	@Autowired
	private ITurnosRepository repository;
	        
	
	@Override
	public List<Turnos> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Turnos> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Turnos save(Turnos turnos) {
		return this.repository.save(turnos);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
