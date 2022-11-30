package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Categoria;
import com.gecco.Repository.ICategoriaRepository;
import com.gecco.Service.ICategoriaService;

@Service
public class CategoriaServiceImplement implements ICategoriaService{
	
	@Autowired
	private ICategoriaRepository repository;
	        
	
	@Override
	public List<Categoria> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Categoria> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Categoria save(Categoria categoria) {
		return this.repository.save(categoria);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
