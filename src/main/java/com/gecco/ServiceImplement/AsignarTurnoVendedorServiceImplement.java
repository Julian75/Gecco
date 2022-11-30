package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AsignarTurnoVendedor;
import com.gecco.Repository.IAsignarTurnoVendedorRepository;
import com.gecco.Service.IAsignarTurnoVendedorService;

@Service
public class AsignarTurnoVendedorServiceImplement implements IAsignarTurnoVendedorService {
	@Autowired
	private IAsignarTurnoVendedorRepository repository;
	        
	
	@Override
	public List<AsignarTurnoVendedor> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AsignarTurnoVendedor> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AsignarTurnoVendedor save(AsignarTurnoVendedor asignarTurnoVendedor) {
		return this.repository.save(asignarTurnoVendedor);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
