package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.MatrizNecesidadDetalle;

public interface IMatrizNecesidadDetalleService {

	public List<MatrizNecesidadDetalle> all();
	
	public Optional<MatrizNecesidadDetalle> findById(Long id);
	
	public MatrizNecesidadDetalle save(MatrizNecesidadDetalle matrizNecesidadDetalle);
	
	public void delete(Long id);
}
