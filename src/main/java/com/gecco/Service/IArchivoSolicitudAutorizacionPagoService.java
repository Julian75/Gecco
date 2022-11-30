package com.gecco.Service;
import java.util.List;
import java.util.Optional;

import com.gecco.Entity.ArchivoSolicitudAutorizacionPago;
public interface IArchivoSolicitudAutorizacionPagoService {
	public List<ArchivoSolicitudAutorizacionPago> all();
	
	public Optional<ArchivoSolicitudAutorizacionPago> findById(Long id);
	
	public ArchivoSolicitudAutorizacionPago save(ArchivoSolicitudAutorizacionPago archivoSolicitudAutorizacionPago);
	
	public void delete(Long id);
}
