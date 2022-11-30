package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Novedades;

public interface INovedadesRepository extends JpaRepository<Novedades, Long>{
	
}