package com.gecco.Service;

import java.util.List;
import java.util.Optional;


import com.gecco.Entity.TipoNovedades;
public interface ITipoNovedadesService {
public List<TipoNovedades> all();
	
	public Optional<TipoNovedades> findById(Long id);
	
	public TipoNovedades save(TipoNovedades tipoNovedades);
	
	public void delete(Long id);
}
