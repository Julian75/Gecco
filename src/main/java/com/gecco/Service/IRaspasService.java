package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Raspas;

public interface IRaspasService {

	public List<Raspas> all();
	
	public Optional<Raspas> findById(Long id);
	
	public Raspas save(Raspas raspas);
	
	public void delete(Long id);

}
