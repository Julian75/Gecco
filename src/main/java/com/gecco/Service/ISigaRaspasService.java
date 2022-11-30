package com.gecco.Service;

import java.util.List;

import com.gecco.Entity.SigaRaspas;

public interface ISigaRaspasService {
	
	public List<SigaRaspas> saveAll(List<SigaRaspas> sigaRaspas);

	public void delete();
}
