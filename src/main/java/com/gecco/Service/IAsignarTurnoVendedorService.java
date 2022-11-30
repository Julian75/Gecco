package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AsignarTurnoVendedor;
public interface IAsignarTurnoVendedorService {
public List<AsignarTurnoVendedor> all();
	
	public Optional<AsignarTurnoVendedor> findById(Long id);
	
	public AsignarTurnoVendedor save(AsignarTurnoVendedor asignarTurnoVendedor);
	
	public void delete(Long id);
}
