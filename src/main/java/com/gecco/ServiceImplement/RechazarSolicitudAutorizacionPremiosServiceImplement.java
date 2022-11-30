package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.RechazarSolicitudAutorizacionPremios;
import com.gecco.Repository.IRechazarSolicitudAutorizacionPremiosRepository;
import com.gecco.Service.IRechazarSolicitudAutorizacionPremiosService;

@Service
public class RechazarSolicitudAutorizacionPremiosServiceImplement implements IRechazarSolicitudAutorizacionPremiosService{
	@Autowired
	private IRechazarSolicitudAutorizacionPremiosRepository repository;
	        
	
	@Override
	public List<RechazarSolicitudAutorizacionPremios> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<RechazarSolicitudAutorizacionPremios> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public RechazarSolicitudAutorizacionPremios save(RechazarSolicitudAutorizacionPremios rechazoMatrizDetalle) {
		return this.repository.save(rechazoMatrizDetalle);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
