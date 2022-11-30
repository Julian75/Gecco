package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.MovimientoComprasInventario;

public interface IMovimientoComprasInventarioService {
	
	public List<MovimientoComprasInventario> all();
	
	public Optional<MovimientoComprasInventario> findById(Long id);
	
	public MovimientoComprasInventario save(MovimientoComprasInventario movimientoComprasInventario);
	
	public void delete(Long id);
}
