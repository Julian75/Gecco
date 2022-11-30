package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Novedades;
import com.gecco.Repository.INovedadesRepository;
import com.gecco.Service.INovedadesService;

@Service
public class NovedadesServiceImplement implements INovedadesService{

	@Autowired
	private INovedadesRepository repository;
	        
	
	@Override
	public List<Novedades> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Novedades> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Novedades save(Novedades novedades) {
		return this.repository.save(novedades);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}