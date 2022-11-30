package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.LibroMayor;
import com.gecco.Repository.ILibroMayorRepository;
import com.gecco.Service.ILibroMayorService;

@Service
public class LibroMayorServiceImplement implements ILibroMayorService{
	@Autowired
	private ILibroMayorRepository repository;
	        
	
	@Override
	public List<LibroMayor> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<LibroMayor> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public LibroMayor save(LibroMayor libroMayor) {
		return this.repository.save(libroMayor);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
