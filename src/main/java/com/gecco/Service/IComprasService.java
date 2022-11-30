package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Compra;

public interface IComprasService {
public List<Compra> all();
	
	public Optional<Compra> findById(Long id);
	
	public Compra save(Compra compras);
	
	public void delete(Long id);
}
