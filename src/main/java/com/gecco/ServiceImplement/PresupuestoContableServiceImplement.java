package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.PresupuestoContable;
import com.gecco.Repository.IPresupuestoContableRepository;
import com.gecco.Service.IPresupuestoContableService;


@Service
public class PresupuestoContableServiceImplement implements IPresupuestoContableService{
	@Autowired
	private IPresupuestoContableRepository repository;
	        
	
	@Override
	public List<PresupuestoContable> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<PresupuestoContable> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public PresupuestoContable save(PresupuestoContable presupuestoContable) {
		return this.repository.save(presupuestoContable);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
