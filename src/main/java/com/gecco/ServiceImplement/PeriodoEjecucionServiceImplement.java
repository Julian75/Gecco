package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.PeriodoEjecucion;
import com.gecco.Repository.IPeriodoEjecucionRepository;
import com.gecco.Service.IPeriodoEjucucionService;

@Service
public class PeriodoEjecucionServiceImplement implements IPeriodoEjucucionService{

	@Autowired
	private IPeriodoEjecucionRepository repository;
	        
	
	@Override
	public List<PeriodoEjecucion> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<PeriodoEjecucion> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public PeriodoEjecucion save(PeriodoEjecucion periodoEjecucion) {
		return this.repository.save(periodoEjecucion);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
