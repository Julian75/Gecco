package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.ArticulosBaja;
import com.gecco.Repository.IArticulosBajaRepository;
import com.gecco.Service.IArticulosBajaService;

@Service
public class ArticulosBajaServiceImplement implements IArticulosBajaService{
	
	@Autowired
	private IArticulosBajaRepository repository;
	        
	
	@Override
	public List<ArticulosBaja> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<ArticulosBaja> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public ArticulosBaja save(ArticulosBaja articulosBaja) {
		return this.repository.save(articulosBaja);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
