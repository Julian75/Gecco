package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.ElementosVisita;
public interface IElementosVisitaService {
public List<ElementosVisita> all();
	
	public Optional<ElementosVisita> findById(Long id);
	
	public ElementosVisita save(ElementosVisita ElementosVisita);
	
	public void delete(Long id);
}
