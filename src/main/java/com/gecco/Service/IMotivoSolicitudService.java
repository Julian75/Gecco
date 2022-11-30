package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.MotivoSolicitud;

public interface IMotivoSolicitudService {

	public List<MotivoSolicitud> all();
	
	public Optional<MotivoSolicitud> findById(Long id);
	
	public MotivoSolicitud save(MotivoSolicitud tipoSolicitud);
	
	public void delete(Long id);
}