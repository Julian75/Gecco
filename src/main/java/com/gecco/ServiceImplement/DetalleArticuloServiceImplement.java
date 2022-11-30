package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.DetalleArticulo;
import com.gecco.Repository.IDetalleArticuloRepository;
import com.gecco.Service.IDetalleArticuloService;

@Service
public class DetalleArticuloServiceImplement implements IDetalleArticuloService{
	
	@Autowired
	private IDetalleArticuloRepository repository;
	        
	
	@Override
	public List<DetalleArticulo> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<DetalleArticulo> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public DetalleArticulo save(DetalleArticulo detalleArticulo) {
		return this.repository.save(detalleArticulo);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
