package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.SolicitudSC;

public interface ISolicitudSCService {

	public List<SolicitudSC> all();
	
	public Optional<SolicitudSC> findById(Long id);
	
	public SolicitudSC save(SolicitudSC solicitudSC);
	
	public void delete(Long id);
}
