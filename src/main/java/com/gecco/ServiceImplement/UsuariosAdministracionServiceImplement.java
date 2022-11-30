package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.UsuariosAdministracion;
import com.gecco.Repository.IUsuariosAdministracionRepository;
import com.gecco.Service.IUsuariosAdministracionService;

@Service
public class UsuariosAdministracionServiceImplement implements IUsuariosAdministracionService{
	
	@Autowired
	private IUsuariosAdministracionRepository repository;
	        
	
	@Override
	public List<UsuariosAdministracion> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<UsuariosAdministracion> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public UsuariosAdministracion save(UsuariosAdministracion usuariosAdministracion) {
		return this.repository.save(usuariosAdministracion);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
