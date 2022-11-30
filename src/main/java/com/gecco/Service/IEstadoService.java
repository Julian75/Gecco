package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Estado;

public interface IEstadoService {
	
	public List<Estado> all();
	
	public Optional<Estado> findById(Long id);
	
	public Estado save(Estado estado);
	
	public void delete(Long id);
}
