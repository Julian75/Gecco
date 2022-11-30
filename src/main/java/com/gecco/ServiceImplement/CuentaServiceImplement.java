package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Cuenta;
import com.gecco.Repository.ICuentaRepository;
import com.gecco.Service.ICuentaService;

@Service
public class CuentaServiceImplement implements ICuentaService{
	@Autowired
	private ICuentaRepository repository;
	        
	
	@Override
	public List<Cuenta> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Cuenta> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Cuenta save(Cuenta cuenta) {
		return this.repository.save(cuenta);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
