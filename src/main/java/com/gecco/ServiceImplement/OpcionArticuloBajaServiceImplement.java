package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.OpcionArticuloBaja;
import com.gecco.Repository.IOpcionArticuloBajaRepository;
import com.gecco.Service.IOpcionArticuloBajaService;

@Service
public class OpcionArticuloBajaServiceImplement implements IOpcionArticuloBajaService{
	
	@Autowired
	private IOpcionArticuloBajaRepository repository;
	        
	
	@Override
	public List<OpcionArticuloBaja> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<OpcionArticuloBaja> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public OpcionArticuloBaja save(OpcionArticuloBaja opcionArticuloBaja) {
		return this.repository.save(opcionArticuloBaja);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
