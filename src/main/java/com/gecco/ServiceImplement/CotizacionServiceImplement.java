package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Cotizacion;
import com.gecco.Repository.ICotizacionRepository;
import com.gecco.Service.ICotizacionService;

@Service
public class CotizacionServiceImplement implements ICotizacionService{

	@Autowired
	private ICotizacionRepository repository;
	        
	
	@Override
	public List<Cotizacion> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Cotizacion> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Cotizacion save(Cotizacion cotizacion) {
		return this.repository.save(cotizacion);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}