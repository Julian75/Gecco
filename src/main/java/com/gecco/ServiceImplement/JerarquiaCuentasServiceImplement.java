package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.JerarquiaCuentas;
import com.gecco.Repository.IJerarquiaCuentasRepository;
import com.gecco.Service.IJerarquiaCuentasService;

@Service
public class JerarquiaCuentasServiceImplement implements IJerarquiaCuentasService{
	@Autowired
	private IJerarquiaCuentasRepository repository;
	        
	
	@Override
	public List<JerarquiaCuentas> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<JerarquiaCuentas> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public JerarquiaCuentas save(JerarquiaCuentas jerarquiaCuentas) {
		return this.repository.save(jerarquiaCuentas);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
