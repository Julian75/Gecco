package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.DetalleSolicitud;
import com.gecco.Repository.IDetalleSolicitudRepository;
import com.gecco.Service.IDetalleSolicitudService;

@Service
public class DetalleSolicitudServiceImplement implements IDetalleSolicitudService{

	@Autowired
	private IDetalleSolicitudRepository repository;
	        
	
	@Override
	public List<DetalleSolicitud> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<DetalleSolicitud> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public DetalleSolicitud save(DetalleSolicitud detalleSolicitud) {
		return this.repository.save(detalleSolicitud);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}