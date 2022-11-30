package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AsignacionesProcesos;
import com.gecco.Repository.IAsignacionesProcesosRepository;
import com.gecco.Service.IAsignacionesProcesosService;

@Service
public class AsignacionesProcesosServiceImplement implements IAsignacionesProcesosService{
	
	@Autowired
	private IAsignacionesProcesosRepository repository;
	        
	
	@Override
	public List<AsignacionesProcesos> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AsignacionesProcesos> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AsignacionesProcesos save(AsignacionesProcesos asignacionesProcesos) {
		return this.repository.save(asignacionesProcesos);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
