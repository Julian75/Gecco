package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AsignacionesArticulos;
import com.gecco.Repository.IAsignacionesArticulosRepository;
import com.gecco.Service.IAsignacionesArticulosService;

@Service
public class AsignacionesArticulosServiceImplement implements IAsignacionesArticulosService{
	
	@Autowired
	private IAsignacionesArticulosRepository repository;
	        
	
	@Override
	public List<AsignacionesArticulos> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AsignacionesArticulos> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AsignacionesArticulos save(AsignacionesArticulos asignacionesArticulos) {
		return this.repository.save(asignacionesArticulos);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
