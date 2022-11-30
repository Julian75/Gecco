package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.RechazoMatrizDetalle;

public interface IRechazoMatrizDetalleService {

	public List<RechazoMatrizDetalle> all();
	
	public Optional<RechazoMatrizDetalle> findById(Long id);
	
	public RechazoMatrizDetalle save(RechazoMatrizDetalle rechazoMatrizDetalle);
	
	public void delete(Long id);

}
