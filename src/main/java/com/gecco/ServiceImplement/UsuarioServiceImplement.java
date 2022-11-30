 package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Usuario;
import com.gecco.Repository.IUsuarioRepository;
import com.gecco.Service.IUsuarioService;

@Service
public class UsuarioServiceImplement implements IUsuarioService{
	
	@Autowired
	private IUsuarioRepository repository;
	        
	
	@Override
	public List<Usuario> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Usuario> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Usuario save(Usuario usuario) {
		return this.repository.save(usuario);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
