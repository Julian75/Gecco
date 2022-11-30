package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Compra;
import com.gecco.Repository.IComprasRepository;
import com.gecco.Service.IComprasService;

@Service
public class ComprasServiceImplement implements IComprasService{
	@Autowired
	private IComprasRepository repository;
	        
	@Override
	public List<Compra> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Compra> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Compra save(Compra compras) {
		return this.repository.save(compras);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}
