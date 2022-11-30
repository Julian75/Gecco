package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Recordatorio;
import com.gecco.Repository.IRecordatorioRepository;
import com.gecco.Service.IRecordatorioService;

@Service
public class RecordatorioServiceImplement implements IRecordatorioService{
	@Autowired
	private IRecordatorioRepository repository;
	        
	
	@Override
	public List<Recordatorio> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Recordatorio> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Recordatorio save(Recordatorio recordatorio) {
		return this.repository.save(recordatorio);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
