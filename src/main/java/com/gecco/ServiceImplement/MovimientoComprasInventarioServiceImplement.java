package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.MovimientoComprasInventario;
import com.gecco.Repository.IMovimientoComprasInventarioRepository;
import com.gecco.Service.IMovimientoComprasInventarioService;

@Service
public class MovimientoComprasInventarioServiceImplement implements IMovimientoComprasInventarioService {
	
	@Autowired
	private IMovimientoComprasInventarioRepository repository;
	        
	@Override
	public List<MovimientoComprasInventario> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<MovimientoComprasInventario> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public MovimientoComprasInventario save(MovimientoComprasInventario motivoComprasInventario) {
		return this.repository.save(motivoComprasInventario);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}
