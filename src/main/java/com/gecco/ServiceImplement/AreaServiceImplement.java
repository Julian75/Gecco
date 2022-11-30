package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.Area;
import com.gecco.Repository.IAreaRepository;
import com.gecco.Service.IAreaService;

@Service
public class AreaServiceImplement implements IAreaService{
	
	@Autowired
	private IAreaRepository repository;
	        
	
	@Override
	public List<Area> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<Area> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Area save(Area area) {
		return this.repository.save(area);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}

}
