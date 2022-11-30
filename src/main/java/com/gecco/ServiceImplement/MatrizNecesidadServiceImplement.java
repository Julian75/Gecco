package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.MatrizNecesidad;
import com.gecco.Repository.IMatrizNecesidadRepository;
import com.gecco.Service.IMatrizNecesidadService;

@Service
public class MatrizNecesidadServiceImplement implements IMatrizNecesidadService{

	@Autowired
	private IMatrizNecesidadRepository repository;
	        
	
	@Override
	public List<MatrizNecesidad> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<MatrizNecesidad> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public MatrizNecesidad save(MatrizNecesidad matrizNecesidad) {
		return this.repository.save(matrizNecesidad);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
