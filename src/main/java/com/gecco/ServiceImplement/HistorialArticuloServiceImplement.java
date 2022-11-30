package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.HistorialArticulo;
import com.gecco.Repository.IHistorialArticuloRepository;
import com.gecco.Service.IHistorialArticuloService;

@Service
public class HistorialArticuloServiceImplement implements IHistorialArticuloService{
	
	@Autowired
	private IHistorialArticuloRepository repository;
	        
	
	@Override
	public List<HistorialArticulo> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<HistorialArticulo> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public HistorialArticulo save(HistorialArticulo historialArticulo) {
		return this.repository.save(historialArticulo);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
