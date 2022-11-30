package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Firmas;
import com.gecco.Repository.IFirmasRepository;
import com.gecco.Service.IFirmasService;

@Service
public class FirmasServiceImplement implements IFirmasService{

	@Autowired
	private IFirmasRepository repository;
	        
	
	@Override
	public List<Firmas> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Firmas> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Firmas save(Firmas firmas) {
		return this.repository.save(firmas);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}
