package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AsignarTurno;

public interface IAsignarTurnoService {

	public List<AsignarTurno> all();
	
	public Optional<AsignarTurno> findById(Long id);
	
	public AsignarTurno save(AsignarTurno asignarTurno);
	
	public void delete(Long id);
}
