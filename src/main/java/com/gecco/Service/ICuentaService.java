package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Cuenta;

public interface ICuentaService {
public List<Cuenta> all();
	
	public Optional<Cuenta> findById(Long id);
	
	public Cuenta save(Cuenta cuenta);
	
	public void delete(Long id);
}
