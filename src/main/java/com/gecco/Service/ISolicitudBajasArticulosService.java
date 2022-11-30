package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.SolicitudBajasArticulos;

public interface ISolicitudBajasArticulosService {

	public List<SolicitudBajasArticulos> all();
	
	public Optional<SolicitudBajasArticulos> findById(Long id);
	
	public SolicitudBajasArticulos save(SolicitudBajasArticulos solicitudBajasArticulos);
	
	public void delete(Long id);
	
}
