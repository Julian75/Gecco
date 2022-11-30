
package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Cotizacion;

public interface ICotizacionService {

	public List<Cotizacion> all();
	
	public Optional<Cotizacion> findById(Long id);
	
	public Cotizacion save(Cotizacion cotizacion);
	
	public void delete(Long id);
}