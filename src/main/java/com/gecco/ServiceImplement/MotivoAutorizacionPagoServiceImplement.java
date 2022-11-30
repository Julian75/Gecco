package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.MotivoAutorizacionPago;
import com.gecco.Repository.IMotivoAutorizacionPagoRepository;
import com.gecco.Service.IMotivoAutorizacionPagoService;
@Service
public class MotivoAutorizacionPagoServiceImplement implements IMotivoAutorizacionPagoService{
	
	@Autowired
	private IMotivoAutorizacionPagoRepository repository;
	        
	
	@Override
	public List<MotivoAutorizacionPago> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<MotivoAutorizacionPago> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public MotivoAutorizacionPago save(MotivoAutorizacionPago motivoAutorizacionPago) {
		return this.repository.save(motivoAutorizacionPago);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
