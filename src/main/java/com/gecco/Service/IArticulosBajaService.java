package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.ArticulosBaja;

public interface IArticulosBajaService {

	public List<ArticulosBaja> all();
	
	public Optional<ArticulosBaja> findById(Long id);
	
	public ArticulosBaja save(ArticulosBaja articulosBaja);
	
	public void delete(Long id);
}
