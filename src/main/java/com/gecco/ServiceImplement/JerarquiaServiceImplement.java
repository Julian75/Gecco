package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Jerarquia;
import com.gecco.Repository.IJerarquiaRepository;
import com.gecco.Service.IJerarquiaService;

@Service
public class JerarquiaServiceImplement  implements IJerarquiaService {
	@Autowired
	private IJerarquiaRepository repository;
	        
	
	@Override
	public List<Jerarquia> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Jerarquia> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Jerarquia save(Jerarquia jerarquia) {
		return this.repository.save(jerarquia);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
