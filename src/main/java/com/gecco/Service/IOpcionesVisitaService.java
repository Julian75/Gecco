package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.OpcionesVisita;
public interface IOpcionesVisitaService {
	public List<OpcionesVisita> all();
	
	public Optional<OpcionesVisita> findById(Long id);
	
	public OpcionesVisita save(OpcionesVisita opcionesVisita);
	
	public void delete(Long id);
}