package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Recordatorio;

public interface IRecordatorioService {
public List<Recordatorio> all();
	
	public Optional<Recordatorio> findById(Long id);
	
	public Recordatorio save(Recordatorio recordatorio);
	
	public void delete(Long id);
}
