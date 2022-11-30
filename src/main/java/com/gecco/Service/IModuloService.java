package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Modulo;

public interface IModuloService {
	
	public List<Modulo> all();
	
	public Optional<Modulo> findById(Long id);
	
	public Modulo save(Modulo modulo);
	
	public void delete(Long id);
}
