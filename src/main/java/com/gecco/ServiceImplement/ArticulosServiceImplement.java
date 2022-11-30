
package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Articulos;
import com.gecco.Repository.IArticulosRepository;
import com.gecco.Service.IArticulosService;

@Service
public class ArticulosServiceImplement implements IArticulosService{

	@Autowired
	private IArticulosRepository repository;
	        
	
	@Override
	public List<Articulos> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Articulos> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Articulos save(Articulos articulos) {
		return this.repository.save(articulos);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}