package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Articulos;

public interface IArticulosService {

	public List<Articulos> all();
	
	public Optional<Articulos> findById(Long id);
	
	public Articulos save(Articulos articulos);
	
	public void delete(Long id);

}