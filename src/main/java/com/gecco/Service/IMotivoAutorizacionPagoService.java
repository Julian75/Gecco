package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.MotivoAutorizacionPago;

public interface IMotivoAutorizacionPagoService {
	
	public List<MotivoAutorizacionPago> all();
	
	public Optional<MotivoAutorizacionPago> findById(Long id);
	
	public MotivoAutorizacionPago save(MotivoAutorizacionPago modulo);
	
	public void delete(Long id);
}
