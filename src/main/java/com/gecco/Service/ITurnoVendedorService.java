package com.gecco.Service;

import java.util.List;

import com.gecco.Entity.TurnoVendedorDTO;

public interface ITurnoVendedorService {

	List<TurnoVendedorDTO> findAll();
	List<TurnoVendedorDTO> findByIdes(Integer idVendedor);
}
