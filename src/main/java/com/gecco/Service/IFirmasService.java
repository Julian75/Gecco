package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Firmas;

public interface IFirmasService {
	
	public List<Firmas> all();
	
	public Optional<Firmas> findById(Long id);
	
	public Firmas save(Firmas firmas);
	
	public void delete(Long id);

}
