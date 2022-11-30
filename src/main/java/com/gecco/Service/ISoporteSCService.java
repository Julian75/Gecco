package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.SoporteSC;

public interface ISoporteSCService {

	public List<SoporteSC> all();
	
	public Optional<SoporteSC> findById(Long id);
	
	public SoporteSC save(SoporteSC soporteSC);
	
	public void delete(Long id);
}