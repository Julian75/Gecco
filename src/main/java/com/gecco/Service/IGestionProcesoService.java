package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.GestionProceso;

public interface IGestionProcesoService {

	public List<GestionProceso> all();
	
	public Optional<GestionProceso> findById(Long id);
	
	public GestionProceso save(GestionProceso gestionProceso);
	
	public void delete(Long id);
}
