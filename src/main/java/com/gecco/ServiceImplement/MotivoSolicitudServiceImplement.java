package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.MotivoSolicitud;
import com.gecco.Repository.IMotivoSolicitudRepository;
import com.gecco.Service.IMotivoSolicitudService;

@Service
public class MotivoSolicitudServiceImplement implements IMotivoSolicitudService{

	@Autowired
	private IMotivoSolicitudRepository repository;
	        
	
	@Override
	public List<MotivoSolicitud> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<MotivoSolicitud> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public MotivoSolicitud save(MotivoSolicitud tipoSolicitud) {
		return this.repository.save(tipoSolicitud);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}