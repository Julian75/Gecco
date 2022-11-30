
package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AsignacionUsuariosPQRS;
import com.gecco.Repository.IAsignacionUsuariosPQRSRepository;
import com.gecco.Service.IAsignacionUsuariosPQRSService;
@Service
public class AsignacionUsuariosPQRSServiceImplement implements IAsignacionUsuariosPQRSService{
	@Autowired
	private IAsignacionUsuariosPQRSRepository repository;
	        
	
	@Override
	public List<AsignacionUsuariosPQRS> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AsignacionUsuariosPQRS> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AsignacionUsuariosPQRS save(AsignacionUsuariosPQRS asignacionUsuariosPqrs) {
		return this.repository.save(asignacionUsuariosPqrs);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
