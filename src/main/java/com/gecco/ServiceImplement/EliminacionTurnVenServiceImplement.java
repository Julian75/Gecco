package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.EliminacionTurnVen;
import com.gecco.Repository.IEliminacionTurnVenRepository;
import com.gecco.Service.IEliminacionTurnVenService;

@Service
public class EliminacionTurnVenServiceImplement implements IEliminacionTurnVenService{

	@Autowired
	private IEliminacionTurnVenRepository repository;
	        
	
	@Override
	public List<EliminacionTurnVen> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<EliminacionTurnVen> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public EliminacionTurnVen save(EliminacionTurnVen eliminacionTurnVen) {
		return this.repository.save(eliminacionTurnVen);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}