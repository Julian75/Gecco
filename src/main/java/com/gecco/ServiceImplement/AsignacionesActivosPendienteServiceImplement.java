package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AsignacionesActivosPendiente;
import com.gecco.Repository.IAsignacionesActivosPendienteRepository;
import com.gecco.Service.IAsignacionesActivosPendienteService;

@Service
public class AsignacionesActivosPendienteServiceImplement implements IAsignacionesActivosPendienteService{

	@Autowired
	private IAsignacionesActivosPendienteRepository repository;
	        
	
	@Override
	public List<AsignacionesActivosPendiente> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AsignacionesActivosPendiente> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AsignacionesActivosPendiente save(AsignacionesActivosPendiente asignacionesActivosPendiente) {
		return this.repository.save(asignacionesActivosPendiente);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}
