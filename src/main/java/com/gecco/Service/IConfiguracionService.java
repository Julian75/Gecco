package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Configuracion;

public interface IConfiguracionService {
public List<Configuracion> all();
	
	public Optional<Configuracion> findById(Long id);
	
	public Configuracion save(Configuracion configuracion);
	
	public void delete(Long id);
}