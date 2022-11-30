package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.GestionProceso;

public interface IGestionProcesoRepository extends JpaRepository<GestionProceso, Long>{

}
