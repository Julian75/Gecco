package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.SolicitudBajasArticulos;
import com.gecco.Repository.ISolicitudBajasArticulosRepository;
import com.gecco.Service.ISolicitudBajasArticulosService;

@Service
public class SolicitudBajasArticulosServiceImplement implements ISolicitudBajasArticulosService{

	@Autowired
	private ISolicitudBajasArticulosRepository repository;
	
	@Override
	public List<SolicitudBajasArticulos> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<SolicitudBajasArticulos> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public SolicitudBajasArticulos save(SolicitudBajasArticulos solicitudBajasArticulos) {
		return this.repository.save(solicitudBajasArticulos);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
	
}
