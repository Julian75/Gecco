package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Rol;

public interface IRolService {
	public List<Rol> all();
		
		public Optional<Rol> findById(Long id);
		
		public Rol save(Rol rol);
		
		public void delete(Long id);
}
