package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.SubProceso;

public interface ISubProcesoService {
	
	public List<SubProceso> all();
	
	public Optional<SubProceso> findById(Long id);
	
	public SubProceso save(SubProceso subProceso);
	
	public void delete(Long id);
}
