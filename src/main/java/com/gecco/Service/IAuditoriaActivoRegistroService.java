package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AuditoriaActivoRegistro;

public interface IAuditoriaActivoRegistroService {
	
	public List<AuditoriaActivoRegistro> all();
	
	public Optional<AuditoriaActivoRegistro> findById(Long id);
	
	public AuditoriaActivoRegistro save(AuditoriaActivoRegistro auditoriaActivoRegistro);
	
	public void delete(Long id);

}
