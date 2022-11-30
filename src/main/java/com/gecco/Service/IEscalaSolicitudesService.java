package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.EscalaSolicitudes;

public interface IEscalaSolicitudesService {
	
	public List<EscalaSolicitudes> all();
	
	public Optional<EscalaSolicitudes> findById(Long id);
	
	public EscalaSolicitudes save(EscalaSolicitudes escalaSolicitudes);
	
	public void delete(Long id);
}