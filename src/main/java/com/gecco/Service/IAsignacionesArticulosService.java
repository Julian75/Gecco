package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AsignacionesArticulos;

public interface IAsignacionesArticulosService {

	public List<AsignacionesArticulos> all();
	
	public Optional<AsignacionesArticulos> findById(Long id);
	
	public AsignacionesArticulos save(AsignacionesArticulos AsignacionesArticulos);
	
	public void delete(Long id);
}
