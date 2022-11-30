package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Cotizacion;

public interface ICotizacionRepository extends JpaRepository<Cotizacion, Long>{

}