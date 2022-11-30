package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.RechazarSolicitudAutorizacionPremios;

public interface IRechazarSolicitudAutorizacionPremiosService {
public List<RechazarSolicitudAutorizacionPremios> all();
	
	public Optional<RechazarSolicitudAutorizacionPremios> findById(Long id);
	
	public RechazarSolicitudAutorizacionPremios save(RechazarSolicitudAutorizacionPremios rechazoMatrizDetalle);
	
	public void delete(Long id);
}
