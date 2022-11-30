package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.EscalaSolicitudes;
import com.gecco.Repository.IEscalaSolicitudesRepository;
import com.gecco.Service.IEscalaSolicitudesService;

@Service
public class EscalaSolicitudesServiceImplement implements IEscalaSolicitudesService {
	
	@Autowired
	private IEscalaSolicitudesRepository repository;
	        
	
	@Override
	public List<EscalaSolicitudes> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<EscalaSolicitudes> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public EscalaSolicitudes save(EscalaSolicitudes escalaSolicitudes) {
		return this.repository.save(escalaSolicitudes);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
	
}