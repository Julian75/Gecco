package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.PresupuestoVentaMensual;
import com.gecco.Repository.IPresupuestoVentaMensualRepository;
import com.gecco.Service.IPresupuestoVentaMensualService;

@Service
public class PresupuestoVentaMensualServiceImplement implements IPresupuestoVentaMensualService{
	@Autowired
	private IPresupuestoVentaMensualRepository repository;
	        
	
	@Override
	public List<PresupuestoVentaMensual> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<PresupuestoVentaMensual> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public PresupuestoVentaMensual save(PresupuestoVentaMensual PresupuestoVentaMensual) {
		return this.repository.save(PresupuestoVentaMensual);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}