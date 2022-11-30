package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.TipoServicio;
import com.gecco.Repository.ITipoServicioRepository;
import com.gecco.Service.ITipoServicioService;

@Service
public class TipoServicioServiceImplement implements ITipoServicioService{
	@Autowired
	private ITipoServicioRepository repository;
	        
	
	@Override
	public List<TipoServicio> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<TipoServicio> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public TipoServicio save(TipoServicio tipoServicio) {
		return this.repository.save(tipoServicio);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}