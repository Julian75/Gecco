package com.gecco.Service;

import java.util.List;
import java.util.Optional;


import com.gecco.Entity.Jerarquia;
import com.gecco.Entity.LibroMayor;
public interface IJerarquiaService {
	public List<Jerarquia> all();
	
	public Optional<Jerarquia> findById(Long id);
	
	public Jerarquia save(Jerarquia jerarquia);
	
	public void delete(Long id);
}
