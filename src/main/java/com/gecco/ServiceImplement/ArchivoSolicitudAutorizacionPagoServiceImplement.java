package com.gecco.ServiceImplement;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.ArchivoSolicitudAutorizacionPago;
import com.gecco.Repository.IArchivoSolicitudAutorizacionPagoRepository;
import com.gecco.Service.IArchivoSolicitudAutorizacionPagoService;
@Service
public class ArchivoSolicitudAutorizacionPagoServiceImplement implements IArchivoSolicitudAutorizacionPagoService{
	@Autowired
	private IArchivoSolicitudAutorizacionPagoRepository repository;
	        
	
	@Override
	public List<ArchivoSolicitudAutorizacionPago> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<ArchivoSolicitudAutorizacionPago> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public ArchivoSolicitudAutorizacionPago save(ArchivoSolicitudAutorizacionPago archivoSolicitudAutorizacionPago) {
		return this.repository.save(archivoSolicitudAutorizacionPago);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
