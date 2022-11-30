package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.MatrizNecesidadDetalle;
import com.gecco.Repository.IMatrizNecesidadDetalleRepository;
import com.gecco.Service.IMatrizNecesidadDetalleService;


@Service
public class MatrizNecesidadDetalleServiceImplement implements IMatrizNecesidadDetalleService {

	@Autowired
	private IMatrizNecesidadDetalleRepository repository;
	        
	
	@Override
	public List<MatrizNecesidadDetalle> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<MatrizNecesidadDetalle> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public MatrizNecesidadDetalle save(MatrizNecesidadDetalle matrizNecesidadDetalle) {
		return this.repository.save(matrizNecesidadDetalle);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
	
}
