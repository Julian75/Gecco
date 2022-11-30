package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AuditoriaActivo;
import com.gecco.Repository.IAuditoriaActivoRepository;
import com.gecco.Service.IAuditoriaActivoService;


@Service
public class AuditoriaActivoServiceImplement implements IAuditoriaActivoService {

	@Autowired
	private IAuditoriaActivoRepository repository;
	        
	
	@Override
	public List<AuditoriaActivo> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AuditoriaActivo> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AuditoriaActivo save(AuditoriaActivo auditoriaActivo) {
		return this.repository.save(auditoriaActivo);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
	
}
