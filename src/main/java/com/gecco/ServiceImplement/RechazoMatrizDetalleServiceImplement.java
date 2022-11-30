package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.RechazoMatrizDetalle;
import com.gecco.Repository.IRechazoMatrizDetalleRepository;
import com.gecco.Service.IRechazoMatrizDetalleService;

@Service
public class RechazoMatrizDetalleServiceImplement implements IRechazoMatrizDetalleService{

	@Autowired
	private IRechazoMatrizDetalleRepository repository;
	        
	
	@Override
	public List<RechazoMatrizDetalle> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<RechazoMatrizDetalle> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public RechazoMatrizDetalle save(RechazoMatrizDetalle rechazoMatrizDetalle) {
		return this.repository.save(rechazoMatrizDetalle);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
