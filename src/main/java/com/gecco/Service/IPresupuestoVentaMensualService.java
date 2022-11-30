package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.PresupuestoVentaMensual;


public interface IPresupuestoVentaMensualService {

	public List<PresupuestoVentaMensual> all();
	
	public Optional<PresupuestoVentaMensual> findById(Long id);
	
	public PresupuestoVentaMensual save(PresupuestoVentaMensual presupuestoVentaMensual);
	
	public void delete(Long id);
	
}
