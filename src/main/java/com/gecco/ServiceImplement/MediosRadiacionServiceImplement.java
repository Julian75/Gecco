package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.MediosRadiacion;
import com.gecco.Repository.IMedioRadiacionRepository;
import com.gecco.Service.IMediosRadiacionService;

@Service
public class MediosRadiacionServiceImplement implements IMediosRadiacionService {
	@Autowired
	private IMedioRadiacionRepository repository;
	        
	
	@Override
	public List<MediosRadiacion> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<MediosRadiacion> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public MediosRadiacion save(MediosRadiacion mediosRadiacion) {
		return this.repository.save(mediosRadiacion);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
