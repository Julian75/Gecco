package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.SolicitudSC;
import com.gecco.Repository.ISolicitudSCRepository;
import com.gecco.Service.ISolicitudSCService;

@Service
public class SolicitudSCServiceImplement implements ISolicitudSCService{

	@Autowired
	private ISolicitudSCRepository repository;
	        
	
	@Override
	public List<SolicitudSC> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<SolicitudSC> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public SolicitudSC save(SolicitudSC solicitudSC) {
		return this.repository.save(solicitudSC);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
