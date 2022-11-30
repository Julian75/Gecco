package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.TipoActivo;

public interface ITipoActivoService {

	public List<TipoActivo> all();
	
	public Optional<TipoActivo> findById(Long id);
	
	public TipoActivo save(TipoActivo tipoActivo);
	
	public void delete(Long id);

}
