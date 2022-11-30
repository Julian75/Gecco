package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.TiposProcesos;
import com.gecco.Repository.ITiposProcesosRepository;
import com.gecco.Service.ITiposProcesosService;

@Service
public class TiposProcesosServiceImplement implements ITiposProcesosService{
	
	@Autowired
	private ITiposProcesosRepository repository;
	        
	
	@Override
	public List<TiposProcesos> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<TiposProcesos> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public TiposProcesos save(TiposProcesos tiposProcesos) {
		return this.repository.save(tiposProcesos);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
