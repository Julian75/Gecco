package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Accesos;

public interface IAccesosService {

	public List<Accesos> all();
	
	public Optional<Accesos> findById(Long id);
	
	public Accesos save(Accesos accesos);
	
	public void delete(Long id);
	
}
