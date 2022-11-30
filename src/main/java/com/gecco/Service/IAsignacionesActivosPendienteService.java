package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AsignacionesActivosPendiente;

public interface IAsignacionesActivosPendienteService {

	public List<AsignacionesActivosPendiente> all();
	
	public Optional<AsignacionesActivosPendiente> findById(Long id);
	
	public AsignacionesActivosPendiente save(AsignacionesActivosPendiente asignacionesActivosPendiente);
	
	public void delete(Long id);
}
