package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.TipoActivo;
import com.gecco.Repository.ITipoActivoRepository;
import com.gecco.Service.ITipoActivoService;

@Service
public class TipoActivoServiceImplement implements ITipoActivoService{
	
	@Autowired
	private ITipoActivoRepository repository;
	        
	
	@Override
	public List<TipoActivo> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<TipoActivo> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public TipoActivo save(TipoActivo tipoActivo) {
		return this.repository.save(tipoActivo);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
