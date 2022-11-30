package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.OrdenCompra;

public interface IOrdenCompraService {

	public List<OrdenCompra> all();
	
	public Optional<OrdenCompra> findById(Long id);
	
	public OrdenCompra save(OrdenCompra ordenCompra);
	
	public void delete(Long id);
}