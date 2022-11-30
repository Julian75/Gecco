package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.PresupuestoContable;

public interface IPresupuestoContableService {
	public List<PresupuestoContable> all();
	
	public Optional<PresupuestoContable> findById(Long id);
	
	public PresupuestoContable save(PresupuestoContable presupuestoContable);
	
	public void delete(Long id);
}
