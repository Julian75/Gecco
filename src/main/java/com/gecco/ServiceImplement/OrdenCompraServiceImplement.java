package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.OrdenCompra;
import com.gecco.Repository.IOrdenCompraRepository;
import com.gecco.Service.IOrdenCompraService;

@Service
public class OrdenCompraServiceImplement implements IOrdenCompraService{

	@Autowired
	private IOrdenCompraRepository repository;
	        
	
	@Override
	public List<OrdenCompra> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<OrdenCompra> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public OrdenCompra save(OrdenCompra ordenCompra) {
		return this.repository.save(ordenCompra);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}