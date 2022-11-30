package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.gecco.Entity.TipoTurno;
import com.gecco.Repository.ITipoTurnoRepository;
import com.gecco.Service.ITipoTurnoService;

@Service
public class TipoTurnoServiceImplement implements ITipoTurnoService{
	@Autowired
	private ITipoTurnoRepository repository;
	        
	
	@Override
	public List<TipoTurno> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<TipoTurno> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public TipoTurno save(TipoTurno tipoTurno) {
		return this.repository.save(tipoTurno);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
