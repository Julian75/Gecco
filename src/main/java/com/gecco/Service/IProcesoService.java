package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Proceso;

public interface IProcesoService {

	public List<Proceso> all();
	
	public Optional<Proceso> findById(Long id);
	
	public Proceso save(Proceso proceso);
	
	public void delete(Long id);
	
}
