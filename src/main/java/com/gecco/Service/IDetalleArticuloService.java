package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.DetalleArticulo;

public interface IDetalleArticuloService {

	public List<DetalleArticulo> all();
	
	public Optional<DetalleArticulo> findById(Long id);
	
	public DetalleArticulo save(DetalleArticulo detalleArticulo);
	
	public void delete(Long id);
}
