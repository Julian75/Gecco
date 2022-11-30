package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Visitas;

public interface IVisitasService {
public List<Visitas> all();
	
	public Optional<Visitas> findById(Long id);
	
	public Visitas save(Visitas visitas);
	
	public void delete(Long id);
}