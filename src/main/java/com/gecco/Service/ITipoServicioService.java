package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.TipoServicio;

public interface ITipoServicioService {
public List<TipoServicio> all();
	
	public Optional<TipoServicio> findById(Long id);
	
	public TipoServicio save(TipoServicio tipoServicio);
	
	public void delete(Long id);
}