package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Inventario;

public interface IInventarioService {
public List<Inventario> all();
	
	public Optional<Inventario> findById(Long id);
	
	public Inventario save(Inventario inventario);
	
	public void delete(Long id);
}
