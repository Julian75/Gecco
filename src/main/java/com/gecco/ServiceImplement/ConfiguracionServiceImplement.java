package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Configuracion;
import com.gecco.Repository.IConfiguracionRepository;
import com.gecco.Service.IConfiguracionService;

@Service
public class ConfiguracionServiceImplement implements IConfiguracionService{
	@Autowired
	private IConfiguracionRepository repository;
	        
	
	@Override
	public List<Configuracion> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Configuracion> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Configuracion save(Configuracion configuracion) {
		return this.repository.save(configuracion);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}