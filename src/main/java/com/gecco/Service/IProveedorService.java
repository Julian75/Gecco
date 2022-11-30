package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Proveedor;

public interface IProveedorService {

	public List<Proveedor> all();
	
	public Optional<Proveedor> findById(Long id);
	
	public Proveedor save(Proveedor proveedor);
	
	public void delete(Long id);
}