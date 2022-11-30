package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.RegistroCorreo;
import com.gecco.Repository.IRegistroCorreoRepository;
import com.gecco.Service.IRegistroCorreoService;

@Service
public class RegistroCorreoServiceImplement implements IRegistroCorreoService{
	@Autowired
	private IRegistroCorreoRepository repository;
	        
	
	@Override
	public List<RegistroCorreo> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<RegistroCorreo> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public RegistroCorreo save(RegistroCorreo raspas) {
		return this.repository.save(raspas);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}