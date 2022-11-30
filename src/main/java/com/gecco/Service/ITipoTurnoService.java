package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.TipoTurno;

public interface ITipoTurnoService {
	public List<TipoTurno> all();
	
	public Optional<TipoTurno> findById(Long id);
	
	public TipoTurno save(TipoTurno tipoTurno);
	
	public void delete(Long id);
}
