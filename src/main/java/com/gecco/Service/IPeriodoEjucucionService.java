package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.PeriodoEjecucion;

public interface IPeriodoEjucucionService {

	public List<PeriodoEjecucion> all();
	
	public Optional<PeriodoEjecucion> findById(Long id);
	
	public PeriodoEjecucion save(PeriodoEjecucion periodoEjecucion);
	
	public void delete(Long id);
}
