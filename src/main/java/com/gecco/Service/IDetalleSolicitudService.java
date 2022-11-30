package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.DetalleSolicitud;

public interface IDetalleSolicitudService {

	public List<DetalleSolicitud> all();
	
	public Optional<DetalleSolicitud> findById(Long id);
	
	public DetalleSolicitud save(DetalleSolicitud detalleSolicitud);
	
	public void delete(Long id);

}