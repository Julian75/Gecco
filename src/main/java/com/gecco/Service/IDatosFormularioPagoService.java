package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.DatosFormularioPago;

public interface IDatosFormularioPagoService {
public List<DatosFormularioPago> all();
	
	public Optional<DatosFormularioPago> findById(Long id);
	
	public DatosFormularioPago save(DatosFormularioPago cuenta);
	
	public void delete(Long id);
}
