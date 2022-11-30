package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.PorcentajePresupuesto;

public interface IPorcentajePresupuestoService {

	public List<PorcentajePresupuesto> all();
	
	public Optional<PorcentajePresupuesto> findById(Long id);
	
	public PorcentajePresupuesto save(PorcentajePresupuesto porcentajePresupuesto);
	
	public void delete(Long id);
}
