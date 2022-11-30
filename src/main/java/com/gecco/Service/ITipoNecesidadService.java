package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.TipoNecesidad;

public interface ITipoNecesidadService {

	public List<TipoNecesidad> all();
	
	public Optional<TipoNecesidad> findById(Long id);
	
	public TipoNecesidad save(TipoNecesidad tipoNecesidad);
	
	public void delete(Long id);

}
