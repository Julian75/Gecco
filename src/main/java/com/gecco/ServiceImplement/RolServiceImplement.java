package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Rol;
import com.gecco.Repository.IRolRepository;
import com.gecco.Service.IRolService;

@Service
public class RolServiceImplement implements IRolService {
	
	@Autowired
	private IRolRepository repository;
	        
	
	@Override
	public List<Rol> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Rol> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Rol save(Rol rol) {
		return this.repository.save(rol);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
