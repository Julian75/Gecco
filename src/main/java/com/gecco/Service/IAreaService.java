package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.Area;


public interface IAreaService {
	
	public List<Area> all();
	
	public Optional<Area> findById(Long id);
	
	public Area save(Area area);
	
	public void delete(Long id);

}
