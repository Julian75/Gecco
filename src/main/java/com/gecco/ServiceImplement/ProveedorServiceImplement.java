package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Proveedor;
import com.gecco.Repository.IProveedorRepository;
import com.gecco.Service.IProveedorService;
@Service
public class ProveedorServiceImplement implements IProveedorService{

	@Autowired
	private IProveedorRepository repository;
	        
	
	@Override
	public List<Proveedor> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Proveedor> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Proveedor save(Proveedor proveedor) {
		return this.repository.save(proveedor);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}