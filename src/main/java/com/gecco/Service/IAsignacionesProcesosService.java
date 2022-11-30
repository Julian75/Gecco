package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AsignacionesProcesos;

public interface IAsignacionesProcesosService {

	public List<AsignacionesProcesos> all();
	
	public Optional<AsignacionesProcesos> findById(Long id);
	
	public AsignacionesProcesos save(AsignacionesProcesos asignacionesProcesos);
	
	public void delete(Long id);
}
