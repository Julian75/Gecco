package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.SolicitudAutorizacionPago;
import com.gecco.Repository.ISolicitudAutorizacionPagoRepository;
import com.gecco.Service.ISolicitudAutorizacionPagoService;

@Service
public class SolicitudAutorizacionPagoServiceImplement implements ISolicitudAutorizacionPagoService{
	@Autowired
	private ISolicitudAutorizacionPagoRepository repository;
	
	@Override
	public List<SolicitudAutorizacionPago> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<SolicitudAutorizacionPago> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public SolicitudAutorizacionPago save(SolicitudAutorizacionPago solicitudAutorizacionPago) {
		return this.repository.save(solicitudAutorizacionPago);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
