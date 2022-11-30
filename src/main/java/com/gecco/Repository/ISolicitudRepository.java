package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Solicitud;

public interface ISolicitudRepository extends JpaRepository<Solicitud, Long>{

}