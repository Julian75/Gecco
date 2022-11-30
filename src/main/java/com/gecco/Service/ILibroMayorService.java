package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.LibroMayor;

public interface ILibroMayorService {
	public List<LibroMayor> all();
	public Optional<LibroMayor> findById(Long id);
	
	public LibroMayor save(LibroMayor libroMayor);
	
	public void delete(Long id);
}
