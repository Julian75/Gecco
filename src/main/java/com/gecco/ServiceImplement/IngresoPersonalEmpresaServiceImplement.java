package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.IngresoPersonalEmpresa;
import com.gecco.Repository.IingresoPersonalEmpresaRepository;
import com.gecco.Service.IIngresoPersonalEmpresaService;

@Service
public class IngresoPersonalEmpresaServiceImplement implements IIngresoPersonalEmpresaService{
	@Autowired
	private IingresoPersonalEmpresaRepository repository;
	        
	
	@Override
	public List<IngresoPersonalEmpresa> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<IngresoPersonalEmpresa> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public IngresoPersonalEmpresa save(IngresoPersonalEmpresa ingresoPersonalEmpresa) {
		return this.repository.save(ingresoPersonalEmpresa);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}