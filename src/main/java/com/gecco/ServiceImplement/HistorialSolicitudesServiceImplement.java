package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.HistorialSolicitudes;
import com.gecco.Repository.IHistorialSolicitudesRepository;
import com.gecco.Service.IHistorialSolicitudesService;

@Service
public class HistorialSolicitudesServiceImplement implements IHistorialSolicitudesService{

	@Autowired
	private IHistorialSolicitudesRepository repository;
	        
	
	@Override
	public List<HistorialSolicitudes> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<HistorialSolicitudes> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public HistorialSolicitudes save(HistorialSolicitudes historialSolicitudes) {
		return this.repository.save(historialSolicitudes);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}