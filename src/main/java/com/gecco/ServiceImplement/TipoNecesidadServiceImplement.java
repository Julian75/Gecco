package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.TipoNecesidad;
import com.gecco.Repository.ITipoNecesidadRepository;
import com.gecco.Service.ITipoNecesidadService;

@Service
public class TipoNecesidadServiceImplement implements ITipoNecesidadService{
	
	@Autowired
	private ITipoNecesidadRepository repository;
	        
	
	@Override
	public List<TipoNecesidad> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<TipoNecesidad> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public TipoNecesidad save(TipoNecesidad tipoNecesidad) {
		return this.repository.save(tipoNecesidad);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
