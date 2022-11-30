package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Turnos;

public interface ITurnosService {

	public List<Turnos> all();
	
	public Optional<Turnos> findById(Long id);
	
	public Turnos save(Turnos turnos);
	
	public void delete(Long id);
}
