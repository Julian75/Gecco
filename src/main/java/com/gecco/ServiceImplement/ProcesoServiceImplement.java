package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Proceso;
import com.gecco.Repository.IProcesoRepository;
import com.gecco.Service.IProcesoService;

@Service
public class ProcesoServiceImplement implements IProcesoService{
	
	@Autowired
	private IProcesoRepository repository;
	        
	
	@Override
	public List<Proceso> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Proceso> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Proceso save(Proceso proceso) {
		return this.repository.save(proceso);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
