
package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.AsignacionUsuariosPQRS;

public interface IAsignacionUsuariosPQRSService {
	
	public List<AsignacionUsuariosPQRS> all();
	
	public Optional<AsignacionUsuariosPQRS> findById(Long id);
	
	public AsignacionUsuariosPQRS save(AsignacionUsuariosPQRS asignacionUsuariosPqrs);
	
	public void delete(Long id);
}