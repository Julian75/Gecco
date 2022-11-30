package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.ArchivoSolicitud;

public interface IArchivoSolicitudRepository extends JpaRepository<ArchivoSolicitud, Long>{
	

}