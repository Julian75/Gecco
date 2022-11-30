package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.HistorialSolicitudes;

public interface IHistorialSolicitudesService {

	public List<HistorialSolicitudes> all();
	
	public Optional<HistorialSolicitudes> findById(Long id);
	
	public HistorialSolicitudes save(HistorialSolicitudes historialSolicitudes);
	
	public void delete(Long id);
}