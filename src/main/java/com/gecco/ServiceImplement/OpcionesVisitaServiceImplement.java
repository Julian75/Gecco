package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gecco.Entity.OpcionesVisita;
import com.gecco.Repository.IOpcionesVisitaRepository;
import com.gecco.Service.IOpcionesVisitaService;
@Service
public class OpcionesVisitaServiceImplement implements IOpcionesVisitaService{
	@Autowired
	private IOpcionesVisitaRepository repository;
	        
	
	@Override
	public List<OpcionesVisita> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<OpcionesVisita> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public OpcionesVisita save(OpcionesVisita opcionesVisita) {
		return this.repository.save(opcionesVisita);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
