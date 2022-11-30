package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.GestionProceso;
import com.gecco.Repository.IGestionProcesoRepository;
import com.gecco.Service.IGestionProcesoService;

@Service
public class GestionProcesoServiceImplement implements IGestionProcesoService{
	
	@Autowired
	private IGestionProcesoRepository repository;
	        
	
	@Override
	public List<GestionProceso> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<GestionProceso> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public GestionProceso save(GestionProceso gestionProceso) {
		return this.repository.save(gestionProceso);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
