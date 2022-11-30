package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.UsuariosAdministracion;

public interface IUsuariosAdministracionService {

	public List<UsuariosAdministracion> all();
	
	public Optional<UsuariosAdministracion> findById(Long id);
	
	public UsuariosAdministracion save(UsuariosAdministracion usuariosAdministracion);
	
	public void delete(Long id);
}
