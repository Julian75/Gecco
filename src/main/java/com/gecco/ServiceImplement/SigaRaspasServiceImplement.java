package com.gecco.ServiceImplement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.SigaRaspas;
import com.gecco.Repository.ISigaRaspasRepository;
import com.gecco.Service.ISigaRaspasService;


@Service
public class SigaRaspasServiceImplement implements ISigaRaspasService{

	@Autowired
	private ISigaRaspasRepository repository;

	@Override
	public List<SigaRaspas> saveAll (List<SigaRaspas> sigaRaspas){
		List<SigaRaspas> response = (List<SigaRaspas>)
		this.repository.saveAll(sigaRaspas);
		return response;
	}

	@Override
	public void delete() {
		this.repository.deleteAll();		
	}
}
