package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.JerarquiaCuentas;

public interface IJerarquiaCuentasService {
public List<JerarquiaCuentas> all();
	
	public Optional<JerarquiaCuentas> findById(Long id);
	
	public JerarquiaCuentas save(JerarquiaCuentas inventario);
	
	public void delete(Long id);
}
