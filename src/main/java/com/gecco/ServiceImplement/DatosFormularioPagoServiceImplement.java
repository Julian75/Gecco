package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.DatosFormularioPago;
import com.gecco.Repository.IDatosFormularioPagoRepository;
import com.gecco.Service.IDatosFormularioPagoService;

@Service
public class DatosFormularioPagoServiceImplement implements IDatosFormularioPagoService {
	@Autowired
	private IDatosFormularioPagoRepository repository;
	        
	
	@Override
	public List<DatosFormularioPago> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<DatosFormularioPago> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public DatosFormularioPago save(DatosFormularioPago datosFormularioPago) {
		return this.repository.save(datosFormularioPago);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
