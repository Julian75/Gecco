package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.VisitaDetalle;

public interface IVisitaDetalleService {
public List<VisitaDetalle> all();
	
	public Optional<VisitaDetalle> findById(Long id);
	
	public VisitaDetalle save(VisitaDetalle visitaDetalle);
	
	public void delete(Long id);
}
