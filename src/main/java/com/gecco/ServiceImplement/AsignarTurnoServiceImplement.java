package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.AsignarTurno;
import com.gecco.Repository.IAsignarTurnoRepository;
import com.gecco.Service.IAsignarTurnoService;

@Service
public class AsignarTurnoServiceImplement implements IAsignarTurnoService{

	@Autowired
	private IAsignarTurnoRepository repository;
	        
	
	@Override
	public List<AsignarTurno> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<AsignarTurno> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public AsignarTurno save(AsignarTurno asignarTurno) {
		return this.repository.save(asignarTurno);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
