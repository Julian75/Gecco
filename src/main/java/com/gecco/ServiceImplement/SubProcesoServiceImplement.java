package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.SubProceso;
import com.gecco.Repository.ISubProcesoRepository;
import com.gecco.Service.ISubProcesoService;

@Service
public class SubProcesoServiceImplement implements ISubProcesoService{

	@Autowired
	private ISubProcesoRepository repository;
	        
	
	@Override
	public List<SubProceso> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<SubProceso> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public SubProceso save(SubProceso subProceso) {
		return this.repository.save(subProceso);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
