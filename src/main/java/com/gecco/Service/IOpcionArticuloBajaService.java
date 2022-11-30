package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.OpcionArticuloBaja;

public interface IOpcionArticuloBajaService {

	public List<OpcionArticuloBaja> all();
	
	public Optional<OpcionArticuloBaja> findById(Long id);
	
	public OpcionArticuloBaja save(OpcionArticuloBaja opcionArticuloBaja);
	
	public void delete(Long id);
}
