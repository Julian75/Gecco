package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.TiposProcesos;

public interface ITiposProcesosService {

	public List<TiposProcesos> all();
	
	public Optional<TiposProcesos> findById(Long id);
	
	public TiposProcesos save(TiposProcesos tiposProcesos);
	
	public void delete(Long id);

}
