package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Solicitud;
import com.gecco.Repository.ISolicitudRepository;
import com.gecco.Service.ISolicitudService;

@Service
public class SolicitudServiceImplement implements ISolicitudService{

	@Autowired
	private ISolicitudRepository repository;
	        
	
	@Override
	public List<Solicitud> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Solicitud> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Solicitud save(Solicitud solicitud) {
		return this.repository.save(solicitud);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}