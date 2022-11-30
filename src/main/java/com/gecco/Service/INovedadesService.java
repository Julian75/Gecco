package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Novedades;

public interface INovedadesService {

	public List<Novedades> all();
	
	public Optional<Novedades> findById(Long id);
	
	public Novedades save(Novedades novedades);
	
	public void delete(Long id);
}