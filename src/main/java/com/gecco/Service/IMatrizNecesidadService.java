package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.MatrizNecesidad;

public interface IMatrizNecesidadService {

	public List<MatrizNecesidad> all();
	
	public Optional<MatrizNecesidad> findById(Long id);
	
	public MatrizNecesidad save(MatrizNecesidad matrizNecesidad);
	
	public void delete(Long id);
}
