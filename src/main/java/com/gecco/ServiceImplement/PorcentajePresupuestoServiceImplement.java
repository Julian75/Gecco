package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.PorcentajePresupuesto;
import com.gecco.Repository.IPorcentajePresupuestoRepository;
import com.gecco.Service.IPorcentajePresupuestoService;

@Service
public class PorcentajePresupuestoServiceImplement implements IPorcentajePresupuestoService{

	@Autowired
	private IPorcentajePresupuestoRepository repository;
	        
	
	@Override
	public List<PorcentajePresupuesto> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<PorcentajePresupuesto> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public PorcentajePresupuesto save(PorcentajePresupuesto porcentajePresupuesto) {
		return this.repository.save(porcentajePresupuesto);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
