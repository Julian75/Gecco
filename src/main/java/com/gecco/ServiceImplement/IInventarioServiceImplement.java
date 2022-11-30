package com.gecco.ServiceImplement;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Inventario;
import com.gecco.Repository.IInventarioRepository;
import com.gecco.Service.IInventarioService;
@Service
public class IInventarioServiceImplement implements IInventarioService{
	@Autowired
	private IInventarioRepository repository;
	        
	@Override
	public List<Inventario> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Inventario> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Inventario save(Inventario inventario) {
		return this.repository.save(inventario);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}
