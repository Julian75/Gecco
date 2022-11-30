package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AuditoriaActivoRegistro;
import com.gecco.Repository.IAuditoriaActivoRegistroRepository;
import com.gecco.Service.IAuditoriaActivoRegistroService;


@Service
public class AuditoriaActivoRegistroServiceImplement implements IAuditoriaActivoRegistroService {
	@Autowired
	private IAuditoriaActivoRegistroRepository repository;
	        
	
	@Override
	public List<AuditoriaActivoRegistro> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AuditoriaActivoRegistro> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AuditoriaActivoRegistro save(AuditoriaActivoRegistro auditoriaActivoRegistro) {
		return this.repository.save(auditoriaActivoRegistro);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
