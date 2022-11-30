package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.TipoNovedades;
import com.gecco.Repository.ITipoNovedadesRepository;
import com.gecco.Service.ITipoNovedadesService;

@Service
public class TipoNovedadesServiceImplement implements ITipoNovedadesService{
	@Autowired
	private ITipoNovedadesRepository repository;
	        
	
	@Override
	public List<TipoNovedades> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<TipoNovedades> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public TipoNovedades save(TipoNovedades tipoNovedades) {
		return this.repository.save(tipoNovedades);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
