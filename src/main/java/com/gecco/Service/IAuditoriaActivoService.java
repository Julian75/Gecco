package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AuditoriaActivo;

public interface IAuditoriaActivoService {

	public List<AuditoriaActivo> all();
	
	public Optional<AuditoriaActivo> findById(Long id);
	
	public AuditoriaActivo save(AuditoriaActivo auditoriaActivo);
	
	public void delete(Long id);
	
}
