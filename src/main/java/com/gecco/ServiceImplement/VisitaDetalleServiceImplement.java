package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.VisitaDetalle;
import com.gecco.Repository.IVisitaDetalleRepository;
import com.gecco.Service.IVisitaDetalleService;

@Service
public class VisitaDetalleServiceImplement implements IVisitaDetalleService {
	@Autowired
	private IVisitaDetalleRepository repository;
	        
	
	@Override
	public List<VisitaDetalle> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<VisitaDetalle> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public VisitaDetalle save(VisitaDetalle VisitaDetalle) {
		return this.repository.save(VisitaDetalle);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
