package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Accesos;
import com.gecco.Entity.AsignacionPuntoVentaArticulo;
import com.gecco.Repository.IAsignacionPuntoVentaArticuloRepository;
import com.gecco.Service.IAsignacionPuntoVentaArticuloService;

@Service
public class AsignacionPuntoVentaArticuloServiceImplement implements IAsignacionPuntoVentaArticuloService{
	
	@Autowired
	private IAsignacionPuntoVentaArticuloRepository repository;
	        
	
	@Override
	public List<AsignacionPuntoVentaArticulo> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AsignacionPuntoVentaArticulo> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AsignacionPuntoVentaArticulo save(AsignacionPuntoVentaArticulo asignacionPuntoVentaArticulo) {
		return this.repository.save(asignacionPuntoVentaArticulo);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
