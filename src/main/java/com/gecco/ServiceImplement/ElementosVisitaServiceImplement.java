package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.ElementosVisita;
import com.gecco.Repository.IElementosVisitaRepository;
import com.gecco.Service.IElementosVisitaService;
@Service
public class ElementosVisitaServiceImplement implements IElementosVisitaService{
	@Autowired
	private IElementosVisitaRepository repository;
	        
	
	@Override
	public List<ElementosVisita> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<ElementosVisita> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public ElementosVisita save(ElementosVisita elementosVisita) {
		return this.repository.save(elementosVisita);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}