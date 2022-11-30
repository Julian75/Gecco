package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Sedes;

public interface ISedesService {
	public List<Sedes> all();
	
	public Optional<Sedes> findById(Long id);
	
	public Sedes save(Sedes sedes);
	
	public void delete(Long id);
}