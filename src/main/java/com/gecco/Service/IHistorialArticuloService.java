package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.HistorialArticulo;

public interface IHistorialArticuloService {

	public List<HistorialArticulo> all();
	
	public Optional<HistorialArticulo> findById(Long id);
	
	public HistorialArticulo save(HistorialArticulo historialArticulo);
	
	public void delete(Long id);
}
