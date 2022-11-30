package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.RegistroCorreo;

public interface IRegistroCorreoService {
public List<RegistroCorreo> all();
	
	public Optional<RegistroCorreo> findById(Long id);
	
	public RegistroCorreo save(RegistroCorreo registroCorreo);
	
	public void delete(Long id);
}