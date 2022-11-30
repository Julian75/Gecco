package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.EliminacionTurnVen;

public interface IEliminacionTurnVenService {

	public List<EliminacionTurnVen> all();
	
	public Optional<EliminacionTurnVen> findById(Long id);
	
	public EliminacionTurnVen save(EliminacionTurnVen eliminacionTurnVen);
	
	public void delete(Long id);
}