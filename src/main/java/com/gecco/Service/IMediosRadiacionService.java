package com.gecco.Service;

import java.util.List;
import java.util.Optional;


import com.gecco.Entity.MediosRadiacion;

public interface IMediosRadiacionService {
public List<MediosRadiacion> all();
	
	public Optional<MediosRadiacion> findById(Long id);
	
	public MediosRadiacion save(MediosRadiacion mediosRadiacion);
	
	public void delete(Long id);
}
