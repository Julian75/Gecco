package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AsignacionPuntoVentaArticulo;

public interface IAsignacionPuntoVentaArticuloService {

	public List<AsignacionPuntoVentaArticulo> all();
	
	public Optional<AsignacionPuntoVentaArticulo> findById(Long id);
	
	public AsignacionPuntoVentaArticulo save(AsignacionPuntoVentaArticulo AsignacionPuntoVentaArticulo);
	
	public void delete(Long id);
}
