package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Solicitud;

public interface ISolicitudService {

	public List<Solicitud> all();
	
	public Optional<Solicitud> findById(Long id);
	
	public Solicitud save(Solicitud solicitud);
	
	public void delete(Long id);

}