package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.SolicitudAutorizacionPago;

public interface ISolicitudAutorizacionPagoService {
public List<SolicitudAutorizacionPago> all();
	
	public Optional<SolicitudAutorizacionPago> findById(Long id);
	
	public SolicitudAutorizacionPago save(SolicitudAutorizacionPago solicitudAutorizacionPago);
	
	public void delete(Long id);
}
