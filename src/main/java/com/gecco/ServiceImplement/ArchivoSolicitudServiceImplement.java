package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.ArchivoSolicitud;
import com.gecco.Repository.IArchivoSolicitudRepository;
import com.gecco.Service.IArchivoSolicitudService;

@Service
public class ArchivoSolicitudServiceImplement implements IArchivoSolicitudService{
	
	@Autowired
	private IArchivoSolicitudRepository repository;
	        
	
	@Override
	public List<ArchivoSolicitud> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<ArchivoSolicitud> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public ArchivoSolicitud save(ArchivoSolicitud archivoSolicitud) {
		return this.repository.save(archivoSolicitud);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}